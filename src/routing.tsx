import { createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/post',
        element: <PostPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/admin',
        element: <AdminPage/>
    }

]);

export default router;
