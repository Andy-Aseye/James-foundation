import React from "react";
import BlogCard from "../Blog/BlogCard";
import Link from "next/link";

const FeaturedPosts = ({ blogs }) => {
  // Get the first 6 blogs for horizontal scroll
  const featuredBlogs = blogs && Array.isArray(blogs) ? blogs.slice(0, 6) : [];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Latest Blogs</h2>
            <p className="text-gray-600">Discover our most recent insights and stories</p>
          </div>
          <Link 
            href="/blogs"
            className="text-black hover:text-gray-700 font-medium inline-flex items-center transition-colors"
          >
            View All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {featuredBlogs.length > 0 ? (
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 w-max">
              {featuredBlogs.map((blog) => (
                <div key={blog.id} className="w-80 flex-shrink-0">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No blogs available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
