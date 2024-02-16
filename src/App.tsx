import './i18n/config';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useSetRecoilState } from 'recoil';
import { loginService } from './lib/services/loginService';
import { Toaster } from './components/ui/toaster';
import { Tooltip } from 'react-tooltip';
import AlertDialogMain from './components/ui/AlertDialogMain';

const App = () => {
  loginService.setLoginState = useSetRecoilState(loginService.loginState);

  if (!localStorage.theme) {
    localStorage.theme = 'dark';
  }

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <Tooltip id="tooltip-main" clickable opacity={100} />
      <AlertDialogMain />
    </>
  );
};

export default App;
