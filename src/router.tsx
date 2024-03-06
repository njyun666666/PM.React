import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import UserPage from './pages/Org/User/UserPage';
import CompanyPage from './pages/Org/Company/CompanyPage';
import RolesRouter from './layouts/RolesRouter';
import AuthPage from './pages/Auth/AuthPage';

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
        element: <RolesRouter roles={['organization', 'company']} />,
        children: [
          {
            path: 'company',
            element: <RolesRouter roles={['company']} element={<CompanyPage />} />,
          },
          {
            path: 'user',
            element: <UserPage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <RolesRouter roles={['administrator', 'organization']} element={<AuthPage />} />,
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
