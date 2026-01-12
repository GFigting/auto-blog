import { getAllPosts } from '../lib/markdown';
import PostCard from '../components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">最新文章</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">暂无文章</p>
      ) : (
        posts.map(post => <PostCard key={post.slug} post={post} />)
      )}
    </div>
  );
}