import { NextResponse } from 'next/server'
import { blogOperations } from '@/src/lib/supabase'

// GET /api/blogs - Get all published blogs (or all blogs for admin)
export async function GET(request) {
  try {
    const adminPassword = request.headers.get('x-admin-password')
    const isAdmin = adminPassword === process.env.ADMIN_PASSWORD
    
    let blogs
    if (isAdmin) {
      // Admin can see all blogs including drafts
      blogs = await blogOperations.getAllBlogs()
    } else {
      // Public users only see published blogs
      blogs = await blogOperations.getPublishedBlogs()
    }
    
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST /api/blogs - Create a new blog (admin only)
export async function POST(request) {
  try {
    // Check admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const blogData = await request.json()
    
    // Validate required fields
    if (!blogData.title || !blogData.content || !blogData.slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, slug' },
        { status: 400 }
      )
    }

    // Generate excerpt if not provided
    if (!blogData.excerpt) {
      blogData.excerpt = blogData.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .substring(0, 160) + '...'
    }

    const newBlog = await blogOperations.createBlog(blogData)
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
