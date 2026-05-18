import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getPostBySlug } from '../lib/posts';
import GiscusComments from '../components/comments/GiscusComments';
import '../styles/markdown.css';
import styles from './PostPage.module.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h1>文章未找到</h1>
        <Link to="/">返回首页</Link>
      </div>
    );
  }

  const { frontmatter, content } = post;

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <div className={styles.meta}>
          <time>{formatDate(frontmatter.date)}</time>
          {frontmatter.category && (
            <Link
              to={`/category/${frontmatter.category}`}
              className={styles.category}
            >
              {frontmatter.category}
            </Link>
          )}
        </div>
        <div className={styles.tags}>
          {frontmatter.tags.map((tag) => (
            <Link key={tag} to={`/tag/${tag}`} className={styles.tag}>
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ]}
        >
          {content}
        </ReactMarkdown>
      </div>

      <div className={styles.comments}>
        <h2 className={styles.commentsTitle}>评论</h2>
        <GiscusComments />
      </div>
    </article>
  );
}