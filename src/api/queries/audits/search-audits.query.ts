import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import {
  AuditListFilter,
  Pageable,
  PageFullAuditInfo,
  SearchRequest,
} from '~/api/utils/api-requests';

import { auditQueries } from './queries';

export const useSearchAuditsQuery = <T = PageFullAuditInfo>(
  query: { types: string[]; pageable: Pageable; filter?: AuditListFilter },
  searchRequest: SearchRequest,
  options?: UseCustomQueryOptions<PageFullAuditInfo, unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...auditQueries.list(query, searchRequest),
    placeholderData: keepPreviousData,
    ...options,
  });
