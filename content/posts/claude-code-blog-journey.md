---
title: "从零开始：用 Claude Code 搭建个人博客"
date: "2026-05-19"
category: "AI学习"
tags: ["博客", "Claude Code", "Vercel", "Git", "学习笔记"]
excerpt: "记录过去20小时内，我如何用 Claude Code 搭建并维护一个技术博客的全过程。"
---

# 从零开始：用 Claude Code 搭建个人博客

这是我在 Claude Code 中完成的第一篇博客文章。想记录一下过去 20 个小时里学到的东西——关于工具、关于协作、关于把一个想法变成实际可以访问的网站。

## 1. Claude Code 能帮我们做什么

Claude Code 是一个 AI 编程助手，可以帮你：

- **写代码**：从零开始创建项目，或者修改现有代码
- **解释代码**：帮你理解看不懂的部分
- **部署上线**：帮你把项目发布到网上
- **解决问题**：调试错误，优化性能

### 怎么和它对话

在 VS Code 中打开 Claude Code 扩展，直接用自然语言描述你的需求就行。比如：
- "帮我创建一个博客网站"
- "为什么分类页面显示不了文章？"
- "帮我把这个修改推送到 GitHub"

### 记忆功能

Claude Code 不会保存跨会话的对话。但你可以用 `/remember` 命令保存重要信息，或者手动把重要内容保存到文件里。

## 2. 技术栈选择：React + Vite + Vercel

博客用的技术栈：
- **React 19** + **Vite 8** 构建前端
- **React Router** 处理路由
- **Vercel** 部署和托管
- **GitHub** 管理代码和触发自动部署

为什么选这个？因为 Claude Code 帮我选的，它说这套组合最简单、最快。

## 3. 博客项目结构

```
blog/
├── content/
│   └── posts/          ← 所有文章都在这里
│       └── *.md        ← 用 Markdown 写文章
├── src/
│   ├── components/     ← React 组件
│   ├── pages/          ← 页面（首页、文章页、分类页等）
│   ├── lib/            ← 工具函数（解析 Markdown 等）
│   └── styles/         ← 样式
└── vercel.json         ← 部署配置
```

### 文章格式

每篇文章头部有一段元数据（叫做 frontmatter）：

```yaml
---
title: "文章标题"
date: "2026-05-19"
category: "技术"
tags: ["标签1", "标签2"]
excerpt: "文章摘要"
---
```

文章内容用 Markdown 写。

## 4. 部署到 Vercel

Vercel 是一个免费的网站托管平台。部署步骤：

### 方式 A：用 CLI 直接部署

```bash
bun run build && bunx vercel --prod
```

- `bun run build` - 构建项目
- `bunx vercel --prod` - 部署到生产环境

### 方式 B：GitHub 自动部署

1. 把代码推到 GitHub
2. Vercel 检测到更新，自动部署
3. 如果没有自动部署，在 Vercel 后台手动点 **"Redeploy"** 或 **"Promote to Production"**

### SPA 路由问题

如果博客用了 React Router（单页面应用），访问 `/category/技术` 这样的路径时可能会 404。

解决方案是添加 `vercel.json`：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

这样所有路径都会指向 index.html，让 React Router 处理路由。

## 5. Git 基本操作

### 把修改推送到 GitHub

```bash
git add .
git commit -m "提交说明"
git push
```

### 遇到冲突怎么办

如果本地和远程版本不一致，Git 会阻止推送。可以选择：

**方式 1**：强制覆盖远程（适合丢弃远程的修改）
```bash
git pull --force origin master
```

**方式 2**：先拉取远程，再推送
```bash
git pull --rebase origin master
git push
```

## 6. 分类页面的坑

我遇到了一个问题：分类页面显示"暂无文章"，但文章确实存在。

原因是前端解析 Markdown 的 frontmatter 时，没有正确处理 category 字段值的引号。

修复前：
```javascript
let value = line.slice(colonIdx + 1).trim();
```

修复后：
```javascript
let value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
```

## 7. 维护博客的工作流

### 写一篇新文章

1. 在 `content/posts/` 下创建新的 `.md` 文件
2. 按照格式写 frontmatter 和内容
3. 提交并推送到 GitHub

### 修改文章

直接编辑文件，然后：
```bash
git add .
git commit -m "更新文章"
git push
```

### 手动部署到生产环境

```bash
bunx vercel --prod
```

## 8. 导航栏分类

我的导航栏现在有这些分类链接：

- **首页** → `/`
- **技术** → `/category/技术`
- **随笔** → `/category/随笔`
- **AI学习** → `/category/AI学习`
- **关于** → `/about`

## 9. 遇到的问题和解决

| 问题 | 解决方法 |
|------|---------|
| 分类页显示暂无文章 | 修复 frontmatter 解析，添加 `.replace(/^["']\|["']$/g, '')` |
| 子路径 404 | 添加 `vercel.json` 配置 rewrites |
| Git 推送被拒绝 | `git pull --force` 或解决冲突 |
| Vercel 没自动部署 | 手动 Redeploy 或 Promote to Production |

## 10. 下一步学什么

- 深色/浅色主题切换的实现
- 评论系统（Giscus）的集成
- RSS 订阅功能
- 文章搜索功能
- SEO 优化

---

*写这篇文章的时候，我刚学会用 Claude Code 不到 24 小时。如果有说错的地方，欢迎指正。*

*2026年5月19日*