import Giscus from '@giscus/react';
import { useTheme } from '../../context/ThemeContext';

export default function GiscusComments() {
  const { theme } = useTheme();

  return (
    <Giscus
      repo="your-username/your-repo"
      repoId="YOUR_REPO_ID"
      category="Announcements"
      categoryId="YOUR_CATEGORY_ID"
      mapping="pathname"
      theme={theme === 'dark' ? 'dark' : 'light'}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      lang="zh-CN"
    />
  );
}