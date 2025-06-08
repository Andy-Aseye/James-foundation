import { NextResponse } from 'next/server'
import { blogOperations } from '@/src/lib/supabase'

// GET /api/comments?blog_id=xxx - Get comments for a specific blog
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get('blog_id')
    
    if (!blogId) {
      return NextResponse.json(
        { error: 'blog_id parameter is required' },
        { status: 400 }
      )
    }
    
    const comments = await blogOperations.getComments(blogId)
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST /api/comments - Add a new comment
export async function POST(request) {
  try {
    const commentData = await request.json()
    
    // Validate required fields
    if (!commentData.blog_id || !commentData.author_name || !commentData.author_email || !commentData.content) {
      return NextResponse.json(
        { error: 'Missing required fields: blog_id, author_name, author_email, content' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(commentData.author_email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Sanitize content (basic HTML stripping for security)
    commentData.content = commentData.content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    
    const newComment = await blogOperations.addComment(commentData)
    
    return NextResponse.json(
      { 
        message: 'Comment submitted successfully. It will be visible after approval.',
        comment: newComment 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
