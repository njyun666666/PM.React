import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ScrollArea, ScrollBar } from 'src/components/ui/scroll-area';
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
    <div className="fixed h-full w-full overflow-hidden">
      <header className="flex h-12 w-full items-center overflow-hidden border-b bg-background p-2">
        <h1>MainLayout</h1>
      </header>

      <nav className="absolute left-0 top-12 z-10 h-[calc(100%-theme(height.12))] w-64 overflow-hidden bg-background">
        <ScrollArea className="h-full w-full p-2">
          <div className="flex flex-col space-y-5">
            <Link to={'/'}>dashboard</Link>
            {/* <Link to={'/login'}>login</Link> */}
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard dashboard a a a a aa a dashboard dashboard </Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>dashboard</Link>
            <Link to={'/'}>---end---</Link>
          </div>
        </ScrollArea>
      </nav>

      <main className="absolute top-12 h-[calc(100%-theme(height.12))] w-full overflow-hidden bg-foreground/10 pl-64">
        <ScrollArea className="h-full w-full p-2">
          <ScrollBar orientation="horizontal" />
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
};

export default MainLayout;
