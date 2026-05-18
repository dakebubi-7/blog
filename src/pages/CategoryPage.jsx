import { useParams } from 'react-router-dom';
import { getPostsByCategory } from '../lib/posts';
import PostList from '../components/post/PostList';

export default function CategoryPage() {
  const { category } = useParams();
  const posts = getPostsByCategory(decodeURIComponent(category));

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>分类：{category}</h1>
      <PostList posts={posts} current={1} total={1} />
    </div>
  );
}