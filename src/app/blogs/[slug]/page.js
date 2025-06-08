import BlogDetails from "@/src/components/Blog/BlogDetails";
import BlogInteractions from "@/src/components/Blog/BlogInteractions";
import CommentSection from "@/src/components/Blog/CommentSection";
import Tag from "@/src/components/Elements/Tag";
import siteMetadata from "@/src/utils/siteMetaData";
import { blogOperations } from "@/src/lib/supabase";
import { slug as slugify } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const blogs = await blogOperations.getPublishedBlogs()
    return blogs.map((blog) => ({ slug: blog.slug }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const blog = await blogOperations.getBlogBySlug(slug)
    
    if (!blog) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.'
      }
    }

    const publishedAt = new Date(blog.created_at).toISOString()
    const modifiedAt = new Date(blog.updated_at || blog.created_at).toISOString()

    let imageList = [siteMetadata.socialBanner]
    if (blog.featured_image) {
      imageList = [blog.featured_image]
    }
    
    const ogImages = imageList.map((img) => {
      return { url: img.includes("http") ? img : siteMetadata.siteUrl + img }
    })

    const authors = blog?.author ? [blog.author] : [siteMetadata.author]

    return {
      title: blog.title,
      description: blog.excerpt || blog.title,
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.title,
        url: `${siteMetadata.siteUrl}/blogs/${blog.slug}`,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        images: ogImages,
        authors: authors,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt || blog.title,
        images: ogImages,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.'
    }
  }
}

// Generate table of contents from HTML content
function generateTOC(content) {
  const headings = []
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '') // Remove any HTML tags
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    headings.push({
      level,
      text,
      id,
      url: `#${id}`
    })
  }

  return headings
}

function TableOfContentsItem({ item, level = "two" }) {
  return (
    <li>
      <a
        href={item.url}
        className={`block py-2 text-sm transition-colors hover:text-black ${
          level === "two" 
            ? "text-gray-900 font-medium border-t border-gray-200 pt-3 first:border-t-0 first:pt-2" 
            : "text-gray-600 pl-4 hover:text-gray-900"
        }`}
      >
        {level === "three" && (
          <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-2">&nbsp;</span>
        )}
        {item.text}
      </a>
    </li>
  )
}

// Component to render HTML content with automatic heading IDs
function RenderHTMLContent({ content }) {
  // Add IDs to headings for table of contents navigation
  const processedContent = content.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/gi,
    (match, level, attrs, text) => {
      const cleanText = text.replace(/<[^>]*>/g, '')
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`
    }
  )

  return (
    <div 
      className="prose prose-lg max-w-none
                 prose-headings:text-black prose-headings:font-semibold
                 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                 prose-p:text-sm prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                 prose-a:text-black prose-a:underline hover:prose-a:text-gray-700
                 prose-strong:text-black prose-strong:font-semibold
                 prose-ul:text-sm prose-ul:text-gray-700
                 prose-ol:text-sm prose-ol:text-gray-700
                 prose-li:mb-1
                 prose-blockquote:bg-gray-50 prose-blockquote:border-l-4 prose-blockquote:border-gray-300
                 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-sm prose-blockquote:text-gray-600
                 prose-blockquote:not-italic prose-blockquote:rounded-r-md
                 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
                 prose-img:rounded-lg prose-img:shadow-sm"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

export default async function BlogPage({ params }) {
  try {
    const { slug } = await params
    const blog = await blogOperations.getBlogBySlug(slug)

    if (!blog) {
      notFound()
    }

    // Increment view count (fire and forget)
    blogOperations.incrementViewCount(blog.id).catch(console.error)

    // Generate table of contents from content
    const toc = generateTOC(blog.content)

    let imageList = [siteMetadata.socialBanner]
    if (blog.featured_image) {
      imageList = [blog.featured_image]
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": blog.title,
      "description": blog.excerpt || blog.title,
      "image": imageList,
      "datePublished": new Date(blog.created_at).toISOString(),
      "dateModified": new Date(blog.updated_at || blog.created_at).toISOString(),
      "author": [{
        "@type": "Person",
        "name": blog.author || siteMetadata.author,
        "url": siteMetadata.twitter,
      }]
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="relative w-full h-[60vh] bg-black">
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {blog.tags && blog.tags.length > 0 && (
                <Tag
                  name={blog.tags[0]}
                  link={`/categories/${slugify(blog.tags[0])}`}
                  className="px-4 py-2 text-xs font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                />
              )}
              <h1 className="inline-block mt-6 font-bold text-white text-2xl md:text-4xl lg:text-5xl !leading-tight relative w-5/6 text-center">
                {blog.title}
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-black/50" />
            {blog.featured_image && (
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            )}
          </div>

          {/* Blog Content Container */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Back to Blogs Link */}
            <div className="mb-8">
              <a
                href="/blogs"
                className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all blogs
              </a>
            </div>

            {/* Blog Meta */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>By <span className="font-medium text-black">{blog.author}</span></span>
                <span>•</span>
                <time dateTime={blog.created_at}>
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {blog.view_count > 0 && (
                  <>
                    <span>•</span>
                    <span>{blog.view_count} views</span>
                  </>
                )}
              </div>
            </div>

            {/* Blog Interactions */}
            <BlogInteractions blog={blog} />

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-8">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="col-span-12 lg:col-span-3">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto">
                    <h3 className="text-sm font-semibold text-black mb-4">Table of Contents</h3>
                    <ul className="space-y-2">
                      {toc.map((item, index) => (
                        <TableOfContentsItem 
                          key={index} 
                          item={item} 
                          level={item.level === 2 ? "two" : "three"} 
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Blog Content */}
              <div className={`${toc.length > 0 ? 'col-span-12 lg:col-span-9' : 'col-span-12'}`}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <RenderHTMLContent content={blog.content} />
                </div>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
                <h3 className="text-sm font-semibold text-black mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      name={tag}
                      link={`/categories/${slugify(tag)}`}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-800 hover:bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="mt-8">
              <CommentSection blogId={blog.id} />
            </div>
          </div>
        </article>
      </>
    )
  } catch (error) {
    console.error('Error loading blog:', error)
    notFound()
  }
}
