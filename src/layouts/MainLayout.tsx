import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <h1>MainLayout</h1>
      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
