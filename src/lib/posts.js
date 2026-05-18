const POSTS_PER_PAGE = 6;

const rawPosts = import.meta.glob('/content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlStr = match[1];
  const content = match[2];
  const data = {};

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''));
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

    data[key] = value;
  }

  return { data, content };
}

function parsePosts() {
  const posts = [];

  for (const [path, raw] of Object.entries(rawPosts)) {
    const slug = path.replace('/content/posts/', '').replace('.md', '');
    const { data, content } = parseFrontmatter(raw);

    if (import.meta.env.PROD && data.draft) continue;

    posts.push({
      slug,
      frontmatter: {
        title: data.title || slug,
        date: data.date || '',
        category: data.category || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || '',
        draft: data.draft || false,
      },
      content,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );
}

let cachedPosts = null;

function getPosts() {
  if (!cachedPosts) cachedPosts = parsePosts();
  return cachedPosts;
}

export function getAllPosts() {
  return getPosts();
}

export function getPostBySlug(slug) {
  return getPosts().find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category) {
  return getPosts().filter((p) => p.frontmatter.category === category);
}

export function getPostsByTag(tag) {
  return getPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export function getAllCategories() {
  const map = new Map();
  for (const p of getPosts()) {
    const c = p.frontmatter.category;
    if (c) map.set(c, (map.get(c) || 0) + 1);
  }
  return Array.from(map, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count
  );
}

export function getAllTags() {
  const map = new Map();
  for (const p of getPosts()) {
    for (const t of p.frontmatter.tags) {
      map.set(t, (map.get(t) || 0) + 1);
    }
  }
  return Array.from(map, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count
  );
}

export function getPostsByPage(page = 1) {
  const all = getPosts();
  const total = Math.ceil(all.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: all.slice(start, start + POSTS_PER_PAGE),
    total,
    current: page,
  };
}

export { POSTS_PER_PAGE };
