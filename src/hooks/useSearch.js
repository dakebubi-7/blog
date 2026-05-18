import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { getAllPosts } from '../lib/posts';

let fuseInstance = null;

function getFuse() {
  if (!fuseInstance) {
    const posts = getAllPosts();
    fuseInstance = new Fuse(posts, {
      keys: [
        { name: 'frontmatter.title', weight: 2 },
        { name: 'frontmatter.excerpt', weight: 1.5 },
        { name: 'frontmatter.tags', weight: 1.5 },
        { name: 'frontmatter.category', weight: 1 },
        { name: 'content', weight: 0.5 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function useSearch(query) {
  const results = useMemo(() => {
    if (!query || query.trim().length < 2) return [];
    return getFuse().search(query.trim()).map((r) => r.item);
  }, [query]);

  return results;
}