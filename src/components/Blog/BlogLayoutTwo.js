import Image from "next/image";
import Link from "next/link";
import React from "react";
import { slug } from "github-slugger";

const BlogLayoutTwo = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="group grid grid-cols-12 gap-4 items-center text-black">
      <Link
        href={`/blogs/${blog.slug}`}
        className="col-span-12 lg:col-span-4 h-full rounded-xl overflow-hidden"
      >
        {blog.featured_image ? (
          <Image
            src={blog.featured_image}
            alt={blog.title}
            width={400}
            height={400}
            className="aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
            sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="aspect-square w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
        
      <div className="col-span-12 lg:col-span-8 w-full">
        {blog.tags && blog.tags.length > 0 && (
          <span className="inline-block w-full uppercase text-gray-600 font-semibold text-xs sm:text-sm mb-2">
            {blog.tags[0]}
          </span>
        )}
        
        <Link href={`/blogs/${blog.slug}`} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg text-black">
            <span className="bg-gradient-to-r from-gray-300 to-gray-300 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>

        {/* Meta Information */}
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={blog.created_at} className="capitalize font-semibold">
            {formatDate(blog.created_at)}
          </time>
          {blog.view_count > 0 && (
            <>
              <span className="mx-2">•</span>
              <span>{blog.view_count} views</span>
            </>
          )}
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {blog.excerpt}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
