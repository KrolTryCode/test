import * as y from 'yup';

export enum ProjectStorageKey {
  RememberMe = 'rememberMe',
  UserId = 'userId',
  SelectedLanguage = 'selectedLanguage',
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export interface ProjectStorageModel {
  [ProjectStorageKey.RememberMe]: boolean;
  [ProjectStorageKey.UserId]: string;
  [ProjectStorageKey.SelectedLanguage]: string;
  [ProjectStorageKey.AccessToken]: string;
  [ProjectStorageKey.RefreshToken]: string;
}

export const ProjectStorageSchemas = {
  [ProjectStorageKey.RememberMe]: y.boolean().required(),
  [ProjectStorageKey.UserId]: y.string().required(),
  [ProjectStorageKey.SelectedLanguage]: y.string().required(),
  [ProjectStorageKey.AccessToken]: y.string().required(),
  [ProjectStorageKey.RefreshToken]: y.string().required(),
};

export const PREFIX = 'indanis_';
