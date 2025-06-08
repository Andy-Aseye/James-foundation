import { NextResponse } from 'next/server'
import { blogOperations } from '@/src/lib/supabase'

// GET /api/blogs/[id] - Get a specific blog by ID or slug
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const adminPassword = request.headers.get('x-admin-password')
    const isAdmin = adminPassword === process.env.ADMIN_PASSWORD
    
    let blog = null
    
    // Check if the parameter looks like a UUID (for admin requests)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    
    if (uuidRegex.test(id)) {
      // It's a UUID, fetch by ID (admin can see drafts)
      if (isAdmin) {
        blog = await blogOperations.getBlogById(id)
      } else {
        // Non-admin users can't access blogs by UUID
        return NextResponse.json(
          { error: 'Blog not found' },
          { status: 404 }
        )
      }
    } else {
      // It's a slug, fetch by slug (public access, published only)
      blog = await blogOperations.getBlogBySlug(id)
    }
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT /api/blogs/[id] - Update a specific blog (admin only)
export async function PUT(request, { params }) {
  try {
    // Check admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const blogData = await request.json()
    
    // Generate excerpt if not provided
    if (!blogData.excerpt && blogData.content) {
      blogData.excerpt = blogData.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .substring(0, 160) + '...'
    }

    const updatedBlog = await blogOperations.updateBlog(id, blogData)
    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE /api/blogs/[id] - Delete a specific blog (admin only)
export async function DELETE(request, { params }) {
  try {
    // Check admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    await blogOperations.deleteBlog(id)
    
    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
