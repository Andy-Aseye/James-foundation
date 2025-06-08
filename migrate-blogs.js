/**
 * Migration Script: Import existing MDX blogs to Supabase
 * 
 * This script reads your existing MDX blog files and imports them into Supabase.
 * Run this after setting up your Supabase database.
 * 
 * Usage: node migrate-blogs.js
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Path to your existing blog content
const CONTENT_DIR = path.join(__dirname, 'content', 'blogs')

/**
 * Convert MDX content to HTML
 * This is a simple conversion - you might want to use a proper MDX processor
 */
function mdxToHtml(content) {
  return content
    // Convert headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // Convert bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Convert code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    
    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // Convert line breaks to paragraphs
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => {
      // Don't wrap if it's already an HTML element
      if (paragraph.startsWith('<')) {
        return paragraph
      }
      return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n\n')
}

/**
 * Read and parse a single MDX file
 */
function parseMdxFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)
    
    return {
      frontmatter,
      content: mdxToHtml(content)
    }
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message)
    return null
  }
}

/**
 * Get all MDX files from the content directory
 */
function getMdxFiles() {
  const files = []
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`)
    return files
  }
  
  const blogDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  for (const blogDir of blogDirs) {
    const blogPath = path.join(CONTENT_DIR, blogDir)
    const indexPath = path.join(blogPath, 'index.mdx')
    
    if (fs.existsSync(indexPath)) {
      files.push({
        path: indexPath,
        slug: blogDir
      })
    }
  }
  
  return files
}

/**
 * Convert frontmatter to blog data
 */
function convertToSupabaseBlog(frontmatter, content, slug) {
  // Generate excerpt if not provided
  let excerpt = frontmatter.description || frontmatter.excerpt
  if (!excerpt) {
    // Extract first paragraph from content
    const textContent = content.replace(/<[^>]*>/g, '')
    excerpt = textContent.substring(0, 160) + '...'
  }
  
  return {
    title: frontmatter.title,
    slug: frontmatter.slug || slug,
    content: content,
    excerpt: excerpt,
    featured_image: frontmatter.image ? `/blogs/${frontmatter.image}` : null,
    author: frontmatter.author || 'Admin',
    tags: frontmatter.tags || [],
    published: frontmatter.isPublished !== false, // Default to true
    created_at: frontmatter.publishedAt ? new Date(frontmatter.publishedAt).toISOString() : new Date().toISOString(),
    updated_at: frontmatter.updatedAt ? new Date(frontmatter.updatedAt).toISOString() : new Date().toISOString()
  }
}

/**
 * Import a single blog to Supabase
 */
async function importBlog(blogData) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select()
      .single()
    
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        console.log(`⚠️  Blog "${blogData.title}" already exists (slug: ${blogData.slug})`)
        return false
      }
      throw error
    }
    
    console.log(`✅ Imported: "${blogData.title}" (slug: ${blogData.slug})`)
    return true
  } catch (error) {
    console.error(`❌ Failed to import "${blogData.title}":`, error.message)
    return false
  }
}

/**
 * Main migration function
 */
async function migrateBlogsToSupabase() {
  console.log('🚀 Starting blog migration to Supabase...\n')
  
  // Test Supabase connection
  try {
    const { data, error } = await supabase.from('blogs').select('count').limit(1)
    if (error) throw error
    console.log('✅ Supabase connection successful\n')
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error.message)
    console.error('Please check your environment variables and database setup')
    process.exit(1)
  }
  
  // Get all MDX files
  const mdxFiles = getMdxFiles()
  
  if (mdxFiles.length === 0) {
    console.log('ℹ️  No MDX files found to migrate')
    return
  }
  
  console.log(`📁 Found ${mdxFiles.length} blog files to migrate\n`)
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  // Process each file
  for (const file of mdxFiles) {
    console.log(`📝 Processing: ${file.slug}`)
    
    const parsed = parseMdxFile(file.path)
    if (!parsed) {
      errorCount++
      continue
    }
    
    const blogData = convertToSupabaseBlog(parsed.frontmatter, parsed.content, file.slug)
    const success = await importBlog(blogData)
    
    if (success) {
      successCount++
    } else {
      skipCount++
    }
  }
  
  // Summary
  console.log('\n📊 Migration Summary:')
  console.log(`✅ Successfully imported: ${successCount}`)
  console.log(`⚠️  Skipped (already exist): ${skipCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📁 Total processed: ${mdxFiles.length}`)
  
  if (successCount > 0) {
    console.log('\n🎉 Migration completed! Your blogs are now available in Supabase.')
    console.log('You can manage them through the admin panel at /secret-admin-panel')
  }
}

// Run the migration
if (require.main === module) {
  migrateBlogsToSupabase()
    .then(() => {
      console.log('\n✨ Migration script finished')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Migration failed:', error)
      process.exit(1)
    })
}

module.exports = { migrateBlogsToSupabase }
