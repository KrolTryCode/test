import { GridColumnVisibilityModel } from '@mui/x-data-grid-premium';
import * as y from 'yup';

import { objectOf } from '~/utils/validation/schemas/object-of';

export enum TableDataStorageKey {
  ColumnsWidth = 'columnsWidth',
  ColumnsHiddenList = 'columnsHiddenList',
  FontSize = 'fontSize',
  TestObject = 'testObject',
}

export interface TableDataStorageModel {
  [TableDataStorageKey.ColumnsWidth]: Record<string, number>;
  [TableDataStorageKey.ColumnsHiddenList]: GridColumnVisibilityModel;
  [TableDataStorageKey.FontSize]: number;
  [TableDataStorageKey.TestObject]: {
    test: string;
  };
}

export const TableDataStorageSchemas = {
  [TableDataStorageKey.TestObject]: y.object({
    test: y.string().required(),
  }),
  [TableDataStorageKey.ColumnsHiddenList]: y.object().test(objectOf(y.boolean())),
  [TableDataStorageKey.ColumnsWidth]: y.object().test(objectOf(y.number())),
  [TableDataStorageKey.FontSize]: y.number().required(),
};

export const PREFIX = 'ksrcTable_';
