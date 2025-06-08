import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (has elevated permissions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Blog-related database operations
export const blogOperations = {
  // Get all published blogs
  async getPublishedBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get a single blog by slug
  async getBlogBySlug(slug) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data
  },

  // Get a single blog by ID (for admin use)
  async getBlogById(id) {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get all blogs (including drafts) - for admin
  async getAllBlogs() {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Create a new blog
  async createBlog(blogData) {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .insert([blogData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update a blog
  async updateBlog(id, blogData) {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update({ ...blogData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete a blog
  async deleteBlog(id) {
    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Increment view count
  async incrementViewCount(id) {
    const { error } = await supabase
      .rpc('increment_view_count', { blog_id: id })
    
    if (error) throw error
  },

  // Like a blog post
  async likeBlog(blogId, ipAddress) {
    // First check if this IP has already liked this post
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('ip_address', ipAddress)
      .single()

    if (existingLike) {
      throw new Error('Already liked')
    }

    // Add the like
    const { error: likeError } = await supabase
      .from('likes')
      .insert([{ blog_id: blogId, ip_address: ipAddress }])

    if (likeError) throw likeError

    // Increment like count
    const { error: countError } = await supabase
      .rpc('increment_like_count', { blog_id: blogId })

    if (countError) throw countError
  },

  // Get comments for a blog
  async getComments(blogId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('blog_id', blogId)
      .eq('approved', true)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Add a comment
  async addComment(commentData) {
    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get related blogs by tags
  async getRelatedBlogs(tags, currentBlogId, limit = 3) {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, featured_image, tags, created_at')
      .eq('published', true)
      .neq('id', currentBlogId)
      .overlaps('tags', tags)
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

// File upload operations
export const fileOperations = {
  // Upload an image to Supabase Storage
  async uploadImage(file, folder = 'blog-images') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabaseAdmin.storage
      .from('blog-assets')
      .upload(filePath, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('blog-assets')
      .getPublicUrl(filePath)

    return {
      path: filePath,
      url: publicUrl
    }
  },

  // Delete an image
  async deleteImage(filePath) {
    const { error } = await supabaseAdmin.storage
      .from('blog-assets')
      .remove([filePath])

    if (error) throw error
  }
}
