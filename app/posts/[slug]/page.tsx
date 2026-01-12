import { notFound } from 'next/navigation';
import { getPostBySlug } from '../../../lib/markdown';
import PostContent from '../../../components/PostContent';
import { Calendar, Folder, Tag } from 'lucide-react';
import Link from 'next/link';

interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Category */}
      <div className="mb-3">
        <Link 
          href={`/categories/${encodeURIComponent(post.meta.category)}`} 
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          <Folder size={14} className="mr-1" />
          {post.meta.category}
        </Link>
      </div>
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.meta.title}</h1>
      
      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500">
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
      
      {/* Content */}
      <article className="prose prose-lg max-w-none">
        <PostContent content={post.content} />
      </article>
    </div>
  );
}