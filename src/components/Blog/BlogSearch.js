'use client'

import React, { useState, useMemo } from 'react'
import BlogCard from './BlogCard'

const BlogSearch = ({ blogs }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Get all unique tags from blogs
  const allTags = useMemo(() => {
    return [...new Set(blogs.flatMap(blog => blog.tags || []))].sort()
  }, [blogs])

  // Filter blogs using useMemo for performance
  const filteredBlogs = useMemo(() => {
    let filtered = blogs

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(blog =>
        blog.tags && blog.tags.includes(selectedTag)
      )
    }

    return filtered
  }, [blogs, searchTerm, selectedTag])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag('')
  }

  return (
    <div className="mb-8">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Blogs
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                placeholder="Search by title, content, or author..."
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="lg:w-64">
            <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Tag
            </label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedTag) && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            {filteredBlogs.length === blogs.length
              ? `Showing all ${blogs.length} blog${blogs.length !== 1 ? 's' : ''}`
              : `Showing ${filteredBlogs.length} of ${blogs.length} blog${blogs.length !== 1 ? 's' : ''}`
            }
            {searchTerm && (
              <span> matching "{searchTerm}"</span>
            )}
            {selectedTag && (
              <span> tagged with "{selectedTag}"</span>
            )}
          </p>
        </div>
      </div>

      {/* Blog Results */}
      <div>
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogSearch
