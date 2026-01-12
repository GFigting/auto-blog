import Link from 'next/link';
import { Calendar, Folder, Tag } from 'lucide-react';
import { Post } from '../lib/markdown';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow mb-8">
      {/* Category */}
      <div className="mb-2">
        <Link 
          href={`/categories/${encodeURIComponent(post.meta.category)}`} 
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          <Folder size={14} className="mr-1" />
          {post.meta.category}
        </Link>
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/posts/${post.slug}`} className="text-dark hover:text-primary transition-colors">
          {post.meta.title}
        </Link>
      </h2>
      
      {/* Description */}
      <p className="text-gray-600 mb-4">{post.meta.description}</p>
      
      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{new Date(post.meta.date).toLocaleDateString('zh-CN')}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.meta.tags.map((tag, index) => (
            <Link 
              key={index} 
              href={`/tags/${encodeURIComponent(tag)}`} 
              className="inline-flex items-center text-xs text-gray-600 hover:text-primary transition-colors"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostCard;