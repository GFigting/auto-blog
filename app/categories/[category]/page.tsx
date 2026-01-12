import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '../../../lib/markdown';
import PostCard from '../../../components/PostCard';

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);
  const allCategories = getAllCategories();
  
  // 检查分类是否存在
  if (!allCategories.includes(category)) {
    notFound();
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">分类：{category}</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">该分类下暂无文章</p>
      ) : (
        <div>
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}