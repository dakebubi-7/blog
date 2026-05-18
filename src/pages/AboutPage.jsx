import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/markdown.css';

const aboutFiles = import.meta.glob('../../content/about.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const aboutRaw = Object.values(aboutFiles)[0] || '';
const content = aboutRaw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

export default function AboutPage() {
  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>关于我</h1>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}