
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

export interface BlogCardProps {
  title: string;
  content: string;
  author: string;
  publishedAt?: string;
  id: string;
}


const BlogCard = ({ title, content, author}: BlogCardProps) => {
  return (
    <Link to={`/blog/${title}`}>
      <div className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow duration-300 bg-white max-w-2xl mx-auto cursor-pointer">
        {/* Author and Metadata */}
        <div className="flex items-center space-x-4 mb-4">
          <Avatar name={author} />
          <div>
            <div className="text-gray-700 font-medium">{author}</div>
    
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Blog Excerpt */}
        <p className="text-sm text-gray-600 mb-4">{content.slice(0, 100)}...</p>

        {/* Read Time */}
        <div className="text-xs text-slate-500 font-light">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};



export default BlogCard;
