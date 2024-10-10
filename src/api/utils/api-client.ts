import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import i18n from 'i18next';
import queryString from 'query-string';

import { ApiConfig, Api } from '~/api/utils/api-requests';
import { authPath, loginPath } from '~/utils/configuration/routes-paths';
import {
  projectLocalStorageService,
  projectSessionStorageService,
} from '~/utils/localstorage/project-storage/project-storage-instance';
import { ProjectStorageKey } from '~/utils/localstorage/project-storage/project-storage.types';
import { showErrorMessage } from '~/utils/show-error-message';

export interface ErrorResponse {
  code: number;
  message: string;
}

const getStorageService = () => {
  const rememberMe = projectLocalStorageService.get(ProjectStorageKey.RememberMe);
  return rememberMe ? projectLocalStorageService : projectSessionStorageService;
};

const BASE_API_URL = '/api';

const API_CONFIG: ApiConfig = {
  baseURL: BASE_API_URL,
};

const API_CONFIG_SECURE: ApiConfig = {
  baseURL: BASE_API_URL,
  securityWorker: async () => {
    const token = getStorageService().get(ProjectStorageKey.AccessToken);

    if (token) {
      return { headers: { Authorization: `Bearer ${token ?? ''}` } };
    }
  },
  paramsSerializer: params => {
    const keys = Object.keys(params);

    let res: {
      [key: string]: unknown;
    } = {};

    for (const key of keys) {
      if (typeof params[key] === 'object' && !Array.isArray(params[key])) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res = { ...res, ...params[key] };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res[key] = params[key];
      }
    }

    return queryString.stringify(res, { arrayFormat: 'none' });
  },
};

export const ApiClient = new Api(API_CONFIG);

export const ApiClientSecured = new Api(API_CONFIG_SECURE);

ApiClientSecured.instance.interceptors.request.use(request => {
  request.headers.set('Accept-Language', i18n.language);
  return request;
});

ApiClient.instance.interceptors.request.use(request => {
  request.headers.set('Accept-Language', i18n.language);
  return request;
});

// https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f#file-axios-refresh_token-1-js
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

// Можно задать кастомные обработчики для каждой ошибки
ApiClientSecured.instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & { _retry: boolean };

    if (error.response?.status === 502) {
      showErrorMessage(error, 'ERROR.TECHNICAL_ERROR');
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (error.config?.url === '/api/v1/jwt/refresh') {
        window.location = `/${authPath}/${loginPath}` as unknown as Location;
        return;
      }

      if (window.location.pathname.startsWith(`/${authPath}`)) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + String(token);
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      const storage = getStorageService();
      storage.remove(ProjectStorageKey.AccessToken);
      const refreshToken = storage.get(ProjectStorageKey.RefreshToken);

      return new Promise(function (resolve, reject) {
        ApiClientSecured.tokenV1Controller
          .regenerateAccessToken({ headers: { Authorization: `Bearer ${refreshToken ?? ''}` } })
          .then(({ token }) => {
            storage.set(ProjectStorageKey.AccessToken, token!);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            processQueue(null, token);
            if (originalRequest) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(axios(originalRequest));
            }
          })
          .catch((err: AxiosError) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);
