---
title: "Vite 构建优化指南"
date: "2025-05-14"
category: "技术"
tags: ["vite", "构建工具", "性能"]
excerpt: "如何优化 Vite 项目的构建性能，减小产物体积。"
draft: false
---

# Vite 构建优化指南

Vite 本身已经很快了，但项目变大后仍需要注意一些优化点。

## 代码分割

Vite 默认使用 Rollup 进行构建，支持自动代码分割。你可以手动指定：

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
```

## 图片优化

- 使用 WebP 格式减小体积
- 小图片使用 base64 内联（Vite 默认 < 4KB 内联）
- 大图片使用懒加载

## 依赖预构建

Vite 会自动预构建依赖。如果你的依赖很多，可以优化预构建配置：

```javascript
export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

## 分析包体积

安装 `rollup-plugin-visualizer` 来分析产物：

```bash
bun add -D rollup-plugin-visualizer
```

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
});
```

## 小贴士

1. 使用动态 `import()` 实现路由懒加载
2. Tree-shaking 只导入需要的模块
3. 压缩图片资源
4. 启用 gzip/brotli 压缩

> 构建优化的核心是：**只加载用户需要的代码**。
