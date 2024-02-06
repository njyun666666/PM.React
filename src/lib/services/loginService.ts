import { SetterOrUpdater, atom } from 'recoil';
import pmAPI from '../api/pmAPI';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { RoleType } from 'src/appConst';

export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginViewModel {
  access_token: 'string';
  refresh_token: 'string';
}

export interface RefreshTokenModel {
  refresh_token: 'string';
}

interface UserPayload extends JwtPayload {
  uid: string;
  role: string | string[];
  photoURL?: string;
}

class LoginService {
  loginState = atom<boolean>({
    key: 'loginState',
    default: !!this.getToken().access_token,
  });

  setLoginState!: SetterOrUpdater<boolean>;

  setToken(data: LoginViewModel) {
    window.localStorage.setItem('access_token', data.access_token);
    window.localStorage.setItem('refresh_token', data.refresh_token);
  }

  getToken() {
    return {
      access_token: window.localStorage.getItem('access_token'),
      refresh_token: window.localStorage.getItem('refresh_token'),
    } as LoginViewModel;
  }

  payload() {
    const access_token = this.getToken().access_token;
    if (access_token) {
      return jwtDecode(access_token) as UserPayload;
    }
  }

  login(data: LoginModel) {
    return pmAPI.post<LoginViewModel>('/api/Login', data);
  }

  logout() {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    this.setLoginState(false);
  }

  refresh() {
    return pmAPI
      .post<LoginViewModel>('/api/Login/RefreshToken', {
        refresh_token: this.getToken().refresh_token,
      })
      .then(({ data }) => {
        this.setToken(data);
        return true;
      })
      .catch(() => false);
  }

  checkRole(roles?: RoleType[]) {
    if (!roles) return true;

    const length = roles.length;

    for (let i = 0; i < length; i++) {
      if (this.payload()?.role.includes(roles[i])) {
        return true;
      }
    }

    return false;
  }
}

export const loginService = new LoginService();
