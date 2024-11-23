import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchicon } from '../assets/index';
import { useBlogs } from '../hooks';
import { useBlogContext } from '../context';
import { useNavigate } from 'react-router-dom';

interface User {
    name: string;
}


const Navbar = () => {
    const [user, setUser] = useState<User | null>();
    const [search, setSearch] = useState<string>('');
    const {blogs, loading} = useBlogs();
    const {filteredblogs, setFilteredBlogs} = useBlogContext();
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
     
    };

    const handleSearch = () => {
        if (search) {
          const filteredBlogs = blogs.filter((blog) => {
            return (
              blog.title.toLowerCase().includes(search.toLowerCase()) ||
              blog.content.toLowerCase().includes(search.toLowerCase())
            );
          });
          setFilteredBlogs(filteredBlogs);
          navigate('/filteredblogs');
        } else {
          setFilteredBlogs(blogs);
        }
      };

    const handleClick = () => {
        localStorage.removeItem('user');
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border-b-2 shadow-md sticky top-0 z-10">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-indigo-600 hover:text-indigo-700">
                <div>IdeaSpace</div>
            </Link>

            {/* Search Bar */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg shadow-sm p-2 w-1/3 sm:w-1/4">
                <input
                    type="text"
                    placeholder="Search..."
                    name="blog"
                    value={search}
                    onChange={handleChange}
                    className="outline-none w-full px-3 py-1 rounded-md text-gray-700"
                />
                <button onClick={handleSearch} className="p-1 hover:bg-indigo-100 rounded-full">
                    <img className="w-6 h-6" src={searchicon} alt="Search" />
                </button>
            </div>
          

            {/* Right-side Section */}
            <div className="flex items-center gap-4">
                {/* Write Section */}
                <Link to={'/publish'}>
                
                
                <div className="font-mono text-xl cursor-pointer hover:underline text-indigo-600">Write</div>
                </Link>

                {/* User Profile or Sign-in */}
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-yellow-500 text-white text-xl font-bold rounded-full shadow-md">
                            {user.name[0].toUpperCase()}
                        </div>

                        <button
                            className="font-bold text-lg text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow-sm"
                            onClick={handleClick}
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <Link to="/signin">
                        <button className="border-transparent rounded-md shadow-sm text-lg text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
