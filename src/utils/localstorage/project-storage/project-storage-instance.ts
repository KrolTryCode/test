import { StorageService } from '~/utils/_localstorage/storage';

import { PREFIX, ProjectStorageModel, ProjectStorageSchemas } from './project-storage.types';

export const projectLocalStorageService = new StorageService<ProjectStorageModel>(
  localStorage,
  ProjectStorageSchemas,
  PREFIX,
);

export const projectSessionStorageService = new StorageService<ProjectStorageModel>(
  sessionStorage,
  ProjectStorageSchemas,
  PREFIX,
);
