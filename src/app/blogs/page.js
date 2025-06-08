import { blogOperations } from "@/src/lib/supabase";
import BlogCard from "@/src/components/Blog/BlogCard";
import BlogSearch from "@/src/components/Blog/BlogSearch";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  title: 'All Blogs',
  description: 'Discover all our latest blog posts and articles.',
  openGraph: {
    title: 'All Blogs',
    description: 'Discover all our latest blog posts and articles.',
    url: `${siteMetadata.siteUrl}/blogs`,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Blogs',
    description: 'Discover all our latest blog posts and articles.',
    images: [siteMetadata.socialBanner],
  },
}

export default async function BlogsPage({ searchParams }) {
  try {
    // Get all published blogs
    const blogs = await blogOperations.getPublishedBlogs()
    
    // Sort blogs by creation date (newest first)
    const sortedBlogs = blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    return (
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
                Our Blog
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover insights, stories, and updates from our community
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          {/* Search, Filter, and Blog Grid - All handled by BlogSearch component */}
          <BlogSearch blogs={sortedBlogs} />
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error loading blogs:', error)
    
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to load blogs
          </h1>
          <p className="text-sm text-gray-600">
            Please try again later.
          </p>
        </div>
      </main>
    )
  }
}
