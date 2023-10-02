import './i18n/config';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useSetRecoilState } from 'recoil';
import { login } from './lib/services/login';

const App = () => {
  login.setLoginState = useSetRecoilState(login.loginState);

  if (!localStorage.theme) {
    localStorage.theme = 'dark';
  }

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return <RouterProvider router={router} />;
};

export default App;
