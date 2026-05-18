import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import TagPage from './pages/TagPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'post/:slug', element: <PostPage /> },
      { path: 'category/:category', element: <CategoryPage /> },
      { path: 'tag/:tag', element: <TagPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}