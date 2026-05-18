import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import aboutRaw from '../../content/about.md?raw';
import { matter } from 'gray-matter';
import '../styles/markdown.css';

export default function AboutPage() {
  const { content } = matter(aboutRaw);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>关于我</h1>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}