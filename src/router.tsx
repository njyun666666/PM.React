import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import D2Page from './pages/Dashboard/D2';

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
        path: '/d2',
        element: <D2Page />,
      },
      {
        path: '/d2-2',
        element: <D2Page />,
      },
      {
        path: '/d3-2-1',
        element: <D2Page />,
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
