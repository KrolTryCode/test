import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const tableQueries = createQueryKeys('tables', {
  metadata: (tableId: string) => ({
    queryKey: [tableId, 'metadata'],
    queryFn: () =>
      ApiClientSecured.contentNodeV1Controller.getTableMetadata(tableId, { withId: true }),
  }),
  content: (tableId: string) => ({
    queryKey: [tableId, 'content'],
    queryFn: () => ApiClientSecured.contentNodeV1Controller.getTableContentByView(tableId),
  }),
});
