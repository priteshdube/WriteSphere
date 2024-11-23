import React from 'react'
import Navbar from '../components/Navbar'
import { Blog, useBlog } from '../hooks'
import { useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import  Loading  from '../components/Loading'


const FullBlog = () => {
    const { title } = useParams<{ title: string }>();

    const { blog, loading } = useBlog({
        title: title || ""
    });

    const { author, content, publishedAt } = blog || { author: { name: "" }, content: "", publishedAt: "" };

    return (
        loading ? (
            <Loading />
        ) : (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                {/* Navbar Section */}
                <div className="bg-white shadow-md">
                    <Navbar />
                </div>

                <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">

                        {/* Blog Title */}
                        <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {title}
                        </div>

                        {/* Author & Published Info */}
                        <div className="flex items-center space-x-4 mt-4">
                            <Avatar name={author.name} />
                            <div>
                                <div className="font-semibold text-lg text-gray-800">{author.name}</div>
                                <div className="text-sm text-gray-500">
                                    {`${Math.ceil(content.length / 100)} minute(s) read`} · {publishedAt}
                                </div>
                            </div>
                        </div>

                
                        <div className="mt-6 text-lg text-gray-800 leading-relaxed space-y-6">
                          <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default FullBlog
