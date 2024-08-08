import { AxiosError } from 'axios';
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

// Можно задать кастомные обработчики для каждой ошибки
ApiClientSecured.instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 502) {
      showErrorMessage(error, 'ERROR.TECHNICAL_ERROR');
    }
    if (error.response?.status === 401) {
      if (error.config?.url === '/api/v1/jwt/refresh') {
        window.location = `/${authPath}/${loginPath}` as unknown as Location;
      } else {
        if (window.location.pathname.startsWith(`/${authPath}`)) {
          return Promise.reject(error);
        }
        const storage = getStorageService();
        storage.remove(ProjectStorageKey.AccessToken);
        const refreshToken = storage.get(ProjectStorageKey.RefreshToken);
        const originalRequest = error.config;
        let token = '';

        await ApiClientSecured.tokenV1Controller
          .regenerateAccessToken({ headers: { Authorization: `Bearer ${refreshToken ?? ''}` } })
          .then(res => {
            token = res.token ?? '';
            storage.set(ProjectStorageKey.AccessToken, token);
          });
        return ApiClientSecured.instance.request({
          ...originalRequest,
          headers: { ...originalRequest?.headers, Authorization: `Bearer ${token}` },
        });
      }
    }
    return Promise.reject(error);
  },
);
