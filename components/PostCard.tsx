import Link from 'next/link';
import { Calendar, Folder, Tag } from 'lucide-react';
import { Post } from '../lib/markdown';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.meta.date).toLocaleDateString('zh-CN');
  const categoryLink = `/categories/${encodeURIComponent(post.meta.category)}`;

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow mb-8">
      <div className="mb-2">
        <Link href={categoryLink} className="inline-flex items-center text-sm text-primary hover:underline">
          <Folder size={14} className="mr-1" />
          {post.meta.category}
        </Link>
      </div>

      <h2 className="text-xl font-bold mb-2">
        <Link href={`/posts/${post.slug}`} className="text-dark hover:text-primary transition-colors">
          {post.meta.title}
        </Link>
      </h2>

      <p className="text-gray-600 mb-4">{post.meta.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.meta.tags.map((tag) => (
            <Link
              key={tag}
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
}

export default PostCard;