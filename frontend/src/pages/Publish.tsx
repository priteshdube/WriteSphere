import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the editor

import Navbar from '../components/Navbar';

const Publish = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handlePublish = async () => {

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to publish a blog');
            navigate('/signin');
            return
       
        }

        try {
            setLoading(true);
            const response = await axios.post(
                'https://backend.mailforpritesh.workers.dev/api/v1/blog/publish',
                { title, content },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Publish a Blog</h1>
                <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter your blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Content Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="content">
                            Blog Content
                        </label>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            theme="snow"
                            style={{ height: '300px' }}

                        />
                    </div>

                    {/* Publish Button */}
                    <div className="flex justify-end pt-10">
                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className={`w-full sm:w-auto px-6 py-2 text-white rounded-lg font-medium ${loading
                                ? 'bg-indigo-300 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                        >
                            {loading ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;
