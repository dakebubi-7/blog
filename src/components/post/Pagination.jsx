import { Link, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

export default function Pagination({ current, total }) {
  if (total <= 1) return null;

  const [searchParams] = useSearchParams();

  function pageUrl(page) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    return `/?${params.toString()}`;
  }

  return (
    <nav className={styles.pagination}>
      {current > 1 && (
        <Link to={pageUrl(current - 1)} className={styles.btn}>
          上一页
        </Link>
      )}
      <span className={styles.info}>
        {current} / {total}
      </span>
      {current < total && (
        <Link to={pageUrl(current + 1)} className={styles.btn}>
          下一页
        </Link>
      )}
    </nav>
  );
}