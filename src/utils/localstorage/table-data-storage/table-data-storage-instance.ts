import { StorageService } from '~/utils/_localstorage/storage';

import { PREFIX, TableDataStorageModel, TableDataStorageSchemas } from './table-data-storage.types';

export const tableDataLocalStorageService = new StorageService<TableDataStorageModel>(
  localStorage,
  TableDataStorageSchemas,
  PREFIX,
);
export const tableDataSessionStorageService = new StorageService<TableDataStorageModel>(
  sessionStorage,
  TableDataStorageSchemas,
  PREFIX,
);
