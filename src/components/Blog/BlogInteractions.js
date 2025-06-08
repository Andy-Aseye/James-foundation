'use client'

import { useState, useEffect } from 'react'
import { HeartIcon, ShareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function BlogInteractions({ blog }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(blog.like_count || 0)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    // Check if user has already liked this blog (stored in localStorage)
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
    setLiked(likedBlogs.includes(blog.id))
  }, [blog.id])

  const handleLike = async () => {
    if (liking || liked) return

    setLiking(true)
    try {
      const response = await fetch(`/api/blogs/${blog.id}/like`, {
        method: 'POST'
      })

      if (response.ok) {
        setLiked(true)
        setLikeCount(prev => prev + 1)
        
        // Store in localStorage to prevent duplicate likes
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]')
        likedBlogs.push(blog.id)
        localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs))
      } else {
        const error = await response.json()
        if (error.error === 'You have already liked this blog') {
          setLiked(true)
        }
      }
    } catch (err) {
      console.error('Error liking blog:', err)
    } finally {
      setLiking(false)
    }
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this blog post: ${blog.title}`

  const shareOptions = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
      setShowShareMenu(false)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section')
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex items-center gap-6 py-4 border-t border-b border-gray-200 dark:border-gray-700">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={liking || liked}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          liked
            ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
            : 'text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
        } ${liking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {liked ? (
          <HeartIconSolid className="w-5 h-5" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">
          {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
        </span>
      </button>

      {/* Comment Button */}
      <button
        onClick={scrollToComments}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer"
      >
        <ChatBubbleLeftIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Comments</span>
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all cursor-pointer"
        >
          <ShareIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10 min-w-48">
            <div className="space-y-2">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-left px-3 py-2 rounded text-white text-sm font-medium transition-colors ${option.color}`}
                  onClick={() => setShowShareMenu(false)}
                >
                  Share on {option.name}
                </a>
              ))}
              <button
                onClick={copyToClipboard}
                className="block w-full text-left px-3 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Close share menu when clicking outside */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
}
