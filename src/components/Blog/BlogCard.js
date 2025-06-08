import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";
import {
  EyeIcon,
  HeartIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const generateExcerpt = (content, maxLength = 320) => {
    if (blog.excerpt) return blog.excerpt;

    // Strip HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, "");

    if (plainText.length <= maxLength) return plainText;

    return plainText.substring(0, maxLength).trim() + "...";
  };

  console.log("blog:", blog);

  return (
    <article className="group bg-white overflow-hidden transition-all duration-300">
      {/* Featured Image */}
      {blog.featured_image && (
        <Link href={`/blogs/${blog.slug}`} className="block">
          <div className="aspect-[3/2] overflow-hidden">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              width={400}
              height={267}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="py-6">
        {/* Title */}
        <div
          style={{
            borderBottom: "1px #AAABAD solid",
            marginBottom: "1rem",
            paddingBottom: "1.5rem",
          }}
        >
          <Link href={`/blogs/${blog.slug}`}>
            <h2 className="text-lg font-semibold text-black mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
              {blog.title}
            </h2>
          </Link>
        </div>

        {/* Excerpt */}
        <p className="text-sm mb-4 line-clamp-3" style={{ color: "#A3A4A2" }}>
          {generateExcerpt(blog.content)}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span>By {blog.author}</span>
            <span>•</span>
            <time dateTime={blog.created_at}>
              {formatDate(blog.created_at)}
            </time>
          </div>

          <div className="flex items-center space-x-3">
            {blog.view_count > 0 && (
              <span className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {blog.view_count}
              </span>
            )}

            {blog.like_count > 0 && (
              <span className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {blog.like_count}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="my-3 flex flex-wrap gap-2">
            {blog.tags.slice(0, 4).map((tag, index) => (
              <Tag
                key={index}
                name={tag}
                link={`/categories/${slug(tag)}`}
                className="text-xs px-3 py-1"
              />
            ))}
          </div>
        )}

        {/* Read More Link */}
        <div className="mt-4 pt-4">
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-sm font-medium text-black hover:text-gray-700 transition-colors inline-flex items-center"
          >
            Read More
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
