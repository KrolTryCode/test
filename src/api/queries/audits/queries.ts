import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { AuditListFilter, Pageable, SearchRequest } from '~/api/utils/api-requests';

export const auditQueries = createQueryKeys('audits', {
  list: (
    query: { types: string[]; pageable: Pageable; filter?: AuditListFilter },
    searchRequest: SearchRequest,
  ) => ({
    queryKey: [{ query, searchRequest }],
    queryFn: () => ApiClientSecured.auditV2Controller.searchAudits(query, searchRequest),
  }),
});
