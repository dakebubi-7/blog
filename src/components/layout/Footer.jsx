import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} 我的博客 · 使用 React + Vite 构建
        </p>
        <div className={styles.links}>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            RSS
          </a>
          <Link to="/about" className={styles.link}>
            关于
          </Link>
        </div>
      </div>
    </footer>
  );
}