import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { login } from 'src/lib/services/login';

const MainLayout = () => {
  const navigate = useNavigate();
  const [loginState] = useRecoilState(login.loginState);

  useEffect(() => {
    if (!loginState) {
      navigate('/login');
    }
  }, [loginState]);

  if (!loginState) {
    return null;
  }

  return (
    <div>
      <h1>MainLayout</h1>
      <div className=" space-x-5">
        <Link to={'/'}>dashboard</Link>
        <Link to={'/login'}>login</Link>
      </div>
      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
