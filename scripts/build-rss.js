import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import RSS from 'rss';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const contentDir = path.join(__dirname, '..', 'content', 'posts');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

const posts = files
  .map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: file.replace('.md', ''),
      frontmatter: data,
      content,
    };
  })
  .filter((p) => !p.frontmatter.draft)
  .sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

const feed = new RSS({
  title: '我的博客',
  description: '技术分享与生活记录',
  feed_url: 'https://example.com/rss.xml',
  site_url: 'https://example.com',
  language: 'zh-CN',
});

for (const post of posts) {
  feed.item({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt || '',
    url: `https://example.com/post/${post.slug}`,
    date: new Date(post.frontmatter.date),
    categories: [
      post.frontmatter.category,
      ...(post.frontmatter.tags || []),
    ].filter(Boolean),
  });
}

fs.writeFileSync(path.join(distDir, 'rss.xml'), feed.xml({ indent: true }));
console.log('RSS generated: dist/rss.xml');