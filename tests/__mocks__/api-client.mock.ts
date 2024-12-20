import {
  AccountConfiguration,
  User,
  UserState,
  UserWithPermissions,
} from '~/api/utils/api-requests';
import { adminRole } from '~/utils/configuration/constants-roles';

export const mockApiClientLogin = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    status: 200,
    data: {
      idToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3YTA2YmFlYS0yY2NkLTQzMTUtODdkYS1mZDIxZjM1Y2JkNDIiLCJpYXQiOjE2OTc2MjgxOTIsIm5iZiI6MTY5NzYyODE5MiwiZXhwIjoxNjk3NzE0NTkyLCJzdWIiOiJzeXN0ZW1fXzVlZjk7F42--ed9LNjuUCPPmKOElv0',
      expiresIn: 86400,
    },
    headers: {
      authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3YTA2YmFlYS0yY2NkLTQzMTUtODdkYS1mZDIxZjM1Y2JkNDIiLCJpYXQiOjE2OTc2MjgxOTIsIm5iZiI6MTY5NzYyODE5MiwiZXhwIjoxNjk3NzE0NTkyLCJzdWIiOiJzeXN0ZW1fXzVlZjk7F42--ed9LNjuUCPPmKOElv0',
      'content-type': 'application/json',
    },
  });
});

export const mockGetCurrentUser = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    status: 200,
    user: {
      admin: true,
      created: '2023-10-19T19:02:00.988Z',
      email: 'test@email.com',
      firstName: 'test',
      id: 'test-3fa85f64-5717-4562-b3fc-2c963f66afa6',
      lastName: 'systemTest',
      state: UserState.Active,
    } as UserWithPermissions,
    permissions: [adminRole],
    passwordExpiresSoon: false,
  });
});

export const mockGetUser = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    id: 'test-admin-id-2c963f66afa6',
    email: 'admin@admin.com',
    firstName: 'admin',
    lastName: 'admin',
    createdFrom: '2020-10-19T19:02:00.988Z',
    state: UserState.Active,
  } as User);
});

export const mockGetAppConfig = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    rootGroupId: '123456-ccww-swsw-deded-y6y6',
    defaultProjectId: '7891011-tgge-88i8i8',
    mainDashboardId: '12131415-4562-b3fc-lod2j9cm',
    userSelfRegistration: true,
  });
});

export const mockCreateAccount = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    status: 200,
    data: {
      email: 'email@test.com',
      firstName: 'firstNameTest',
      lastName: 'secondNameTest',
    },
  });
});

export const mockRegisterAccount = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    status: 200,
    data: {
      username: 'systeMtest',
      password: 'systeMtest',
      activationCode: 'activationTest',
    },
  });
});

export const mockGetTemplates = vi.fn().mockImplementation((_data, _params) => {
  return Promise.resolve({
    status: 200,
    data: [
      {
        id: 'bc9043a6-08ad-4521-96b5-554f6b11c23a',
        name: 'Name',
        content: 'content',
        state: 'Created',
      },
      {
        id: 'ee9e4e54-cc91-4f9d-9231-7d95b67abeac',
        name: 'confirmationEmail',
        content:
          '<!doctype html><html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Код подтверждения регистрации</title></head><body><div>Ваш код подтверждения: <br><b>${activationCode}</b> <br><a href="${activationUrl}">Или нажмите на эту ссылку</a></div><br/></body></html>',
        state: 'Created',
      },
      {
        id: '916fda01-5a31-410b-8ce5-c88022cb55d0',
        name: 'reactivationEmail',
        content:
          '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Код реактивации аккаунта</title></head><body><div>Ваш код реактивации: <br><b>${activationCode}</b> <br><a href="${activationUrl}">Или нажмите на эту ссылку</a></div><br/></body></html>',
        state: 'Created',
      },
      {
        id: '8261d4c7-3203-4941-8b01-47e1b4ea49f6',
        name: '1',
        content: 'testtest',
        state: 'Created',
      },
    ],
  });
});

export const passwordConfiguration: AccountConfiguration = {
  disablingLoginAttemptsPeriodInSeconds: 180,
  enabledExpirationPassword: true,
  expirationTimeInSeconds: 7776000,
  failedAttemptsLimit: 10,
  isExpirationEnabled: true,
  isLoginAttemptsEnabled: true,
  maxAlphabeticalSequenceLengthPassword: 5,
  maxPasswordLength: 16,
  maxRepeatCharacterLengthPassword: 3,
  minPasswordLength: 8,
  monitoringLoginAttemptsPeriodInSeconds: 60,
  noWhitespacePassword: true,
  passwordExpirationTimeInSeconds: 15552000,
  passwordsCountBeforeRepeatPassword: 5,
  requireDigitPassword: true,
  requireLowercasePassword: true,
  requireSpecialPassword: true,
  requireUppercasePassword: true,
};

export const mockGetPasswordConfiguration = vi.fn().mockImplementation(() => {
  return Promise.resolve({
    status: 200,
    data: passwordConfiguration,
  });
});
