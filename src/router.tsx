import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import UserPage from './pages/Org/User/UserPage';
import CompanyPage from './pages/Org/Company/CompanyPage';
import RolesRouter from './layouts/RolesRouter';
import AuthUserPage from './pages/Auth/User/AuthUserPage';
import AuthRolePage from './pages/Auth/Role/AuthRolePage';
import AuthMenuPage from './pages/Auth/Menu/AuthMenuPage';

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
        element: <RolesRouter roles={['administrator']} />,
        children: [
          {
            path: 'menu',
            element: <AuthMenuPage />,
          },
          {
            path: 'role',
            element: <AuthRolePage />,
          },
          {
            path: 'user',
            element: <AuthUserPage />,
          },
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
