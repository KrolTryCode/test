import { ApiClient, ApiClientSecured } from '~/api/utils/api-client';

import {
  mockApiClientLogin,
  mockCreateAccount,
  mockGetCurrentUser,
  mockGetTemplates,
  mockGetUser,
  mockRegisterAccount,
} from '../__mocks__/api-client.mock';

export const setupTestApi = () => {
  ApiClient.authController.login = mockApiClientLogin;
  ApiClient.authController.register = mockRegisterAccount;
  ApiClientSecured.usersV1Controller.getCurrentUser = mockGetCurrentUser;
  ApiClientSecured.usersV1Controller.createUser = mockCreateAccount;
  ApiClientSecured.usersV1Controller.getUser = mockGetUser;
  ApiClientSecured.templatesV1Controller.getAllTemplates = mockGetTemplates;
};
