import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import {
  AuditListFilter,
  Pageable,
  PageFullAuditInfo,
  SearchRequest,
} from '~/api/utils/api-requests';

export const useSearchAuditsQuery = <T = PageFullAuditInfo>(
  query: { types: string[]; pageable: Pageable; filter?: AuditListFilter },
  searchRequest: SearchRequest,
  options?: UseCustomQueryOptions<PageFullAuditInfo, unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    queryKey: [
      'journal',
      query.types,
      searchRequest.criteria,
      { ...query.pageable, ...query.filter },
    ],
    queryFn: async () =>
      await ApiClientSecured.auditV2Controller.searchAudits(query, searchRequest),
    placeholderData: keepPreviousData,
    ...options,
  });
