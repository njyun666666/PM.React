import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import DeptPage from './pages/Org/Dept/DeptPage';
import UserPage from './pages/Org/User/UserPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: 'org',
        children: [
          { path: 'dept', element: <DeptPage /> },
          { path: 'user', element: <UserPage /> },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
