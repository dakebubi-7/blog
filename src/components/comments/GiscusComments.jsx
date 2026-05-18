import Giscus from '@giscus/react';
import { useTheme } from '../../context/ThemeContext';

export default function GiscusComments() {
  const { theme } = useTheme();

  return (
    <Giscus
      repo="dakebubi-7/blog"
      repoId="R_kgDOSgr7Mw"
      category="Announcements"
      categoryId="DIC_kwDOSgr7M84C9TMk"
      mapping="pathname"
      theme={theme === 'dark' ? 'dark' : 'light'}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      lang="zh-CN"
    />
  );
}