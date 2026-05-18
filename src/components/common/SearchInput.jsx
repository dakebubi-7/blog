import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchInput.module.css';

export default function SearchInput({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章..."
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>
        搜索
      </button>
    </form>
  );
}