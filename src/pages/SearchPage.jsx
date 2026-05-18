import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import SearchInput from '../components/common/SearchInput';
import PostList from '../components/post/PostList';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = useSearch(query);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>搜索</h1>
      <div style={{ marginBottom: '1.5rem' }}>
        <SearchInput initialQuery={query} />
      </div>
      {query && (
        <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
          {results.length} 个结果："{query}"
        </p>
      )}
      <PostList posts={results} current={1} total={1} />
    </div>
  );
}