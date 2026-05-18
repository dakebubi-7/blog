import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostCard({ post }) {
  const { slug, frontmatter } = post;

  return (
    <article className={styles.card}>
      <Link to={`/post/${slug}`} className={styles.titleLink}>
        <h2 className={styles.title}>{frontmatter.title}</h2>
      </Link>
      <div className={styles.meta}>
        <span>{formatDate(frontmatter.date)}</span>
        {frontmatter.category && (
          <Link
            to={`/category/${frontmatter.category}`}
            className={styles.category}
          >
            {frontmatter.category}
          </Link>
        )}
      </div>
      {frontmatter.excerpt && (
        <p className={styles.excerpt}>{frontmatter.excerpt}</p>
      )}
      <div className={styles.tags}>
        {frontmatter.tags.map((tag) => (
          <Link key={tag} to={`/tag/${tag}`} className={styles.tag}>
            {tag}
          </Link>
        ))}
      </div>
    </article>
  );
}