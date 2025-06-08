-- Supabase Database Setup for Blog System
-- Run this script in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author TEXT DEFAULT 'Admin',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create likes table (to prevent duplicate likes)
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_id, ip_address)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_comments_blog_id ON comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_likes_blog_id ON likes(blog_id);

-- Create RPC functions for incrementing counters
CREATE OR REPLACE FUNCTION increment_view_count(blog_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blogs 
  SET view_count = view_count + 1 
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_like_count(blog_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blogs 
  SET like_count = like_count + 1 
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- Create storage bucket for blog assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-assets', 'blog-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS) policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Blogs policies
CREATE POLICY "Anyone can view published blogs" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Service role can do everything on blogs" ON blogs
  FOR ALL USING (auth.role() = 'service_role');

-- Comments policies
CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can do everything on comments" ON comments
  FOR ALL USING (auth.role() = 'service_role');

-- Likes policies
CREATE POLICY "Anyone can view likes" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert likes" ON likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can do everything on likes" ON likes
  FOR ALL USING (auth.role() = 'service_role');

-- Storage policies for blog-assets bucket
CREATE POLICY "Anyone can view blog assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-assets');

CREATE POLICY "Service role can upload blog assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-assets' AND auth.role() = 'service_role');

CREATE POLICY "Service role can update blog assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-assets' AND auth.role() = 'service_role');

CREATE POLICY "Service role can delete blog assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-assets' AND auth.role() = 'service_role');
