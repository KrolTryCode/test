import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { tableQueries } from '../queries';

export const getTableContentQueryOptions = (
  nodeId: string,
  options?: UseCustomQueryOptions<Record<string, object[]>, unknown, Record<string, any>[]>,
) =>
  queryOptions({
    ...tableQueries.content(nodeId),
    select(data) {
      const rowCount = data['id']?.length ?? 0;
      const columnDatabaseNames = Object.keys(data);
      const res: Record<string, any>[] = [];
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const rowObject: Record<string, any> = {};
        for (const columnName of columnDatabaseNames) {
          rowObject[columnName] = data[columnName][rowIndex];
        }
        res.push(rowObject);
      }
      return res;
    },
    ...options,
  });
