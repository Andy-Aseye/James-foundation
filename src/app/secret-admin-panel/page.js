'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = sessionStorage.getItem('admin-auth')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
      fetchBlogs()
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Test the password by making a request to the API
      const response = await fetch('/api/blogs', {
        headers: {
          'x-admin-password': password
        }
      })

      if (response.ok) {
        sessionStorage.setItem('admin-auth', 'true')
        sessionStorage.setItem('admin-password', password)
        setIsAuthenticated(true)
        fetchBlogs()
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const fetchBlogs = async () => {
    try {
      const adminPassword = sessionStorage.getItem('admin-password')
      const response = await fetch('/api/blogs', {
        headers: {
          'x-admin-password': adminPassword
        }
      })

      if (response.ok) {
        const blogsData = await response.json()
        setBlogs(blogsData)
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const adminPassword = sessionStorage.getItem('admin-password')
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword
        }
      })

      if (response.ok) {
        fetchBlogs() // Refresh the list
      } else {
        alert('Failed to delete blog')
      }
    } catch (err) {
      alert('Error deleting blog')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth')
    sessionStorage.removeItem('admin-password')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-lg font-semibold text-black mb-2">
              Admin Panel Access
            </h1>
            <p className="text-sm text-gray-600">
              Enter your admin password to continue
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-md p-3">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white text-sm font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-[10vh] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-lg font-semibold text-black">
              Blog Admin Panel
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your blog posts and content
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/secret-admin-panel/new"
              className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
              Create New Blog
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-md border border-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-sm font-medium text-gray-900">
              All Blogs ({blogs.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {blog.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        /{blog.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.published 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {blog.view_count || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {blog.like_count || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {blog.published && (
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            target="_blank"
                          >
                            View
                          </Link>
                        )}
                        <Link
                          href={`/secret-admin-panel/edit/${blog.id}`}
                          className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-sm text-red-600 hover:text-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-sm text-gray-500 mb-6">
                Get started by creating your first blog post.
              </p>
              <Link
                href="/secret-admin-panel/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
              >
                Create New Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
