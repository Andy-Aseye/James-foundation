import { NextResponse } from 'next/server'
import { blogOperations } from '@/src/lib/supabase'

// POST /api/blogs/[id]/like - Like a blog post
export async function POST(request, { params }) {
  try {
    const { id } = await params
    
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    await blogOperations.likeBlog(id, ip)
    
    return NextResponse.json(
      { message: 'Blog liked successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error liking blog:', error)
    
    if (error.message === 'Already liked') {
      return NextResponse.json(
        { error: 'You have already liked this blog' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to like blog' },
      { status: 500 }
    )
  }
}
