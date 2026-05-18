import { useSearchParams } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { getPostsByPage } from '../lib/posts';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { posts, total, current } = getPostsByPage(page);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>最新文章</h1>
      <PostList posts={posts} current={current} total={total} />
    </div>
  );
}