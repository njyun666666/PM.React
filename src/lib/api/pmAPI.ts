import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import HttpStatusCodes from './httpStatusCodes';
import appConfig from 'src/appConfig';
import { loginService } from '../services/loginService';

export interface ResponseErrors {
  errors: {
    [key: string]: string | string[];
  };
}

const baseURL = appConfig.PM_API;

const pmAPI: Readonly<AxiosInstance> = axios.create({
  baseURL: baseURL,
});

const AuthInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const accessToken = loginService.getToken().access_token;
  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }
  return config;
};

const OnResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

const OnResponseFailure = async (error: AxiosError<ResponseErrors>): Promise<ResponseErrors> => {
  const httpStatus = error.response?.status;

  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      if (error.config?.url?.toLowerCase() === '/api/Login'.toLowerCase()) {
        //
      } else if (error.config?.url?.toLowerCase() === '/api/Login/RefreshToken'.toLowerCase()) {
        console.log('Refresh token failed');
        loginService.logout();
      } else {
        // reflash token
        console.log('call reflash token');
        const refresh_token = loginService.getToken().refresh_token;

        if (!refresh_token) {
          console.log('refresh_token is null');
          loginService.logout();
        } else {
          const isRefresh = await loginService.refresh();

          if (!isRefresh) {
            console.log('RefreshToken error');
            loginService.logout();
          } else {
            return await pmAPI.request(error.config as AxiosRequestConfig);
          }
        }
      }

      break;
    case HttpStatusCodes.NOT_FOUND:
      // console.log('Requested resource was not found.');
      break;
    case HttpStatusCodes.FORBIDDEN:
      // console.log('Access to this resource is forbidden');
      break;
    default:
      break;
  }

  return Promise.reject(error);
};

pmAPI.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
pmAPI.interceptors.request.use(AuthInterceptor);
pmAPI.interceptors.response.use(OnResponseSuccess, OnResponseFailure);

export default pmAPI;
