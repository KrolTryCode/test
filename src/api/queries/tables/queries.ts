import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const tableQueries = createQueryKeys('tables', {
  metadata: (tableId: string) => ({
    queryKey: [tableId],
    queryFn: () => ApiClientSecured.tableV1Controller.getTable(tableId),
  }),
  content: (tableId: string) => ({
    queryKey: [tableId],
    queryFn: () => ApiClientSecured.tableV1Controller.getAllRecords(tableId),
  }),
});
