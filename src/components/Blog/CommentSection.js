'use client'

import { useState, useEffect } from 'react'

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: ''
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [blogId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?blog_id=${blogId}`)
      if (response.ok) {
        const commentsData = await response.json()
        setComments(commentsData)
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          blog_id: blogId
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert(result.message)
        setFormData({
          author_name: '',
          author_email: '',
          content: ''
        })
        setShowForm(false)
        // Note: Comments need approval, so we don't add to the list immediately
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit comment')
      }
    } catch (err) {
      alert('Error submitting comment')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div id="comments-section" className="mt-12">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 className="text-2xl font-bold text-dark dark:text-light mb-6">
          Comments ({comments.length})
        </h3>

        {/* Add Comment Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors font-medium"
          >
            Add a Comment
          </button>
        )}

        {/* Comment Form */}
        {showForm && (
          <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-dark dark:text-light mb-4">
              Leave a Comment
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="author_name" className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-light"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="author_email" className="block text-sm font-medium text-dark dark:text-light mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="author_email"
                    value={formData.author_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, author_email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-light"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Your email will not be published
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-dark dark:text-light mb-2">
                  Comment *
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-light"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors disabled:opacity-50 font-medium"
                >
                  {submitting ? 'Submitting...' : 'Submit Comment'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comments are moderated and will appear after approval.
              </p>
            </form>
          </div>
        )}

        {/* Comments List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">Loading comments...</div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to share your thoughts!
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-dark dark:text-light">
                      {comment.author_name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(comment.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.content.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? 'mt-2' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
