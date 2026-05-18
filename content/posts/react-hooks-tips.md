---
title: "React Hooks 实用技巧"
date: "2025-05-12"
category: "技术"
tags: ["react", "hooks", "前端"]
excerpt: "分享几个 React Hooks 的实用技巧，帮助你写出更优雅的代码。"
draft: false
---

# React Hooks 实用技巧

React Hooks 改变了我们编写 React 组件的方式。这里分享一些实用的技巧。

## 1. 自定义 Hook 抽象逻辑

当多个组件共享相同的状态逻辑时，可以提取为自定义 Hook：

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

## 2. useCallback 优化渲染

在将回调函数传递给子组件时，使用 `useCallback` 避免不必要的重渲染：

```javascript
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
```

## 3. useRef 的妙用

`useRef` 不仅可以访问 DOM，还可以保存不触发渲染的值：

```javascript
const timerRef = useRef(null);

useEffect(() => {
  timerRef.current = setInterval(() => {
    // do something
  }, 1000);
  return () => clearInterval(timerRef.current);
}, []);
```

## 总结

| Hook | 用途 |
|------|------|
| useState | 管理组件状态 |
| useEffect | 处理副作用 |
| useCallback | 缓存回调函数 |
| useRef | 访问 DOM / 保存可变值 |
| useMemo | 缓存计算结果 |

合理使用 Hooks 能让代码更简洁、更易维护。
