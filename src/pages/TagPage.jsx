import { useParams } from 'react-router-dom';
import { getPostsByTag } from '../lib/posts';
import PostList from '../components/post/PostList';

export default function TagPage() {
  const { tag } = useParams();
  const posts = getPostsByTag(decodeURIComponent(tag));

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>标签：{tag}</h1>
      <PostList posts={posts} current={1} total={1} />
    </div>
  );
}