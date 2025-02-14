import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Table } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

export const getTableDataQueryOptions = <T = Table>(
  nodeId: string,
  options?: UseCustomQueryOptions<Table, unknown, T>,
) =>
  queryOptions({
    ...tableQueries.metadata(nodeId),
    ...options,
  });
