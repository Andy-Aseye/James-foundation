import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";

const BlogLayoutOne = ({ blog }) => {
  return (
    <div className="group inline-block overflow-hidden rounded-xl">
      <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/90 rounded-xl z-10" />
      
      {blog.featured_image ? (
        <Image
          src={blog.featured_image}
          alt={blog.title}
          width={800}
          height={600}
          className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 1180px) 100vw, 50vw"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20">
        {blog.tags && blog.tags.length > 0 && (
          <Tag
            link={`/categories/${slug(blog.tags[0])}`}
            name={blog.tags[0]}
            className="px-6 text-xs sm:text-sm py-1 sm:py-2 !border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          />
        )}
        
        <Link href={`/blogs/${blog.slug}`} className="mt-6">
          <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-white mt-2 sm:mt-4">
            <span className="bg-gradient-to-r from-white to-white bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>

        {/* Meta Information */}
        <div className="mt-3 flex items-center text-xs text-white/80">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={blog.created_at}>
            {new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
          {blog.view_count > 0 && (
            <>
              <span className="mx-2">•</span>
              <span>{blog.view_count} views</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutOne;
