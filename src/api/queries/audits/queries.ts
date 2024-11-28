import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { Pageable, SearchRequest } from '~/api/utils/api-requests';

export const auditQueries = createQueryKeys('audits', {
  list: (query: { types: string[]; pageable: Pageable }, searchRequest: SearchRequest) => ({
    queryKey: [{ query, searchRequest }],
    queryFn: () => ApiClientSecured.auditV2Controller.searchAudits(query, searchRequest),
  }),
});
