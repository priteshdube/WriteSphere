import React from 'react'
import Navbar from '../components/Navbar'
import { useBlogContext } from '../context'
import Loading from '../components/Loading'
import BlogCard from '../components/BlogCard'
import { useBlogs } from '../hooks'

const Filteredblogs = () => {

    const {loading } = useBlogs();

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
          {filteredblogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              author={blog.author.name}
              publishedAt="2021-09-09"
            />
          ))}
        </div>
      )}
    </div>
  </div>
  )
}

export default Filteredblogs
