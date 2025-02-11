import { createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/post/:id',
                element: <PostPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRoute>
                        <AdminPage/>
                    </ProtectedRoute>
                )
                
            }
        ]
    }
    

]);

export default router;
