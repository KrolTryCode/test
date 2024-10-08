import { GridColumnVisibilityModel } from '@mui/x-data-grid-premium';
import * as y from 'yup';

import { GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { objectOf } from '~/utils/validation/schemas/object-of';

export enum TableDataStorageKey {
  ColumnsWidth = 'columnsWidth',
  ColumnsHiddenList = 'columnsHiddenList',
  FontSize = 'fontSize',
  PagingParams = 'paging',
  TestObject = 'testObject',
}

export interface TableDataStorageModel {
  [TableDataStorageKey.ColumnsWidth]: Record<string, number>;
  [TableDataStorageKey.ColumnsHiddenList]: GridColumnVisibilityModel;
  [TableDataStorageKey.FontSize]: number;
  [TableDataStorageKey.PagingParams]: GridPagingParams;
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
  [TableDataStorageKey.PagingParams]: y.object({
    paginationModel: y.object({ page: y.number(), pageSize: y.number() }),
    groupingModel: y.array(y.string()),
    sortModel: y.array(y.object({ field: y.string(), sort: y.string() })),
    filterModel: y.object({
      items: y.array(y.object({ field: y.string(), operator: y.string(), value: y.string() })),
    }),
  }),
  [TableDataStorageKey.FontSize]: y.number().required(),
};

export const PREFIX = 'indanisTable_';
