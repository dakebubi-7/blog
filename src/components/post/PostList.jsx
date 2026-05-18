import PostCard from './PostCard';
import Pagination from './Pagination';
import styles from './PostList.module.css';

export default function PostList({ posts, current, total }) {
  if (!posts || posts.length === 0) {
    return <p className={styles.empty}>暂无文章</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination current={current} total={total} />
    </div>
  );
}