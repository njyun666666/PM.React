import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Brand from 'src/components/Brand';
import { ScrollArea, ScrollBar } from 'src/components/ui/scroll-area';
import { loginService } from 'src/lib/services/loginService';
import UserNav from './UserNav';
import Nav from './Nav';
import { webSettingService } from 'src/lib/services/webSettingService';
import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import { useBreakpoint } from 'src/lib/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faBars } from '@fortawesome/free-solid-svg-icons';

const MainLayout = () => {
  const navigate = useNavigate();
  const [loginState] = useRecoilState(loginService.loginState);
  const [navOpenState, setNavOpenState] = useRecoilState(webSettingService.navOpenState);
  const [navExpandedState, setNavExpandedState] = useRecoilState(
    webSettingService.navExpandedState
  );
  const [navDefaultExpanded, setNavDefaultExpanded] = useRecoilState(
    webSettingService.navDefaultExpandedState
  );
  const breakpoint = useBreakpoint();
  const location = useLocation();

  useEffect(() => {
    document.querySelector('main [data-radix-scroll-area-viewport]')?.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!loginState) {
      navigate('/login');
    }
  }, [loginState]);

  useEffect(() => {
    if (breakpoint !== 'default') {
      setNavOpenState(false);
    }
  }, [breakpoint]);

  if (!loginState) {
    return null;
  }

  return (
    <div className="fixed h-full w-full overflow-hidden">
      <header className="flex h-12 w-full items-center space-x-2 overflow-hidden border-b bg-background p-2">
        <div>
          <Button
            variant="ghost"
            className={cn('h-10 w-10 p-2 sm:hidden')}
            onClick={() => setNavOpenState((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} className="" />
          </Button>
        </div>
        <div>
          <Brand />
        </div>
        <div className="grow"></div>
        <div>
          <UserNav />
        </div>
      </header>

      <nav
        className={cn(
          'group/nav absolute left-0 top-0 z-10 flex h-full w-0 flex-col overflow-hidden border-r bg-background duration-200',
          'sm:top-12 sm:h-[calc(100%-theme(height.12))] sm:w-13 sm:border-0',
          {
            '!w-64': navOpenState || navExpandedState,
            'xl:w-64': navDefaultExpanded,
          }
        )}
        onMouseEnter={() => setNavExpandedState(true)}
        onMouseLeave={() => setNavExpandedState(false)}
      >
        <ScrollArea className={cn('w-64 grow p-1.5 pr-2.5')}>
          <Nav />
        </ScrollArea>

        <div className="hidden w-full p-1.5 pt-0 xl:block">
          <Button
            variant="ghost"
            className={cn('w-full p-3')}
            onClick={() => {
              setNavDefaultExpanded((prev) => {
                const val = !prev;
                localStorage.navDefaultExpanded = val;
                return val;
              });

              setNavExpandedState(false);
            }}
          >
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={cn('h-4 w-4 text-secondary duration-200', {
                'rotate-180': navDefaultExpanded,
              })}
            />
          </Button>
        </div>
      </nav>

      {navOpenState && (
        <div
          className={cn('absolute left-0 top-0 z-[9] h-full w-full bg-background/90 duration-200')}
          onClick={() => setNavOpenState((prev) => !prev)}
        ></div>
      )}

      <main
        className={cn(
          'absolute left-0 top-12 h-[calc(100%-theme(height.12))] w-full overflow-hidden bg-foreground/5 pl-0 duration-200',
          'sm:pl-13',
          {
            'xl:pl-64': navDefaultExpanded,
          }
        )}
      >
        <ScrollArea className="h-full w-full">
          <ScrollBar orientation="horizontal" />
          <div className="p-4">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default MainLayout;
