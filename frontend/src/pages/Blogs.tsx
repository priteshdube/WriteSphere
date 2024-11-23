import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { useBlogs } from "../hooks";
import Loading from "../components/Loading";
import { useBlogContext } from "../context";

const Blogs = () => {
  const { blogs, loading } = useBlogs();
  const { filteredblogs } = useBlogContext();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <div className="bg-white shadow-md">
        <Navbar />
      </div>



      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* Blog Cards */}
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author={blog.author.name}

              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
