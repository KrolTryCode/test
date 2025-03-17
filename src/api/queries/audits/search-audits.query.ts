import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Pageable, PageFullAuditInfo, SearchRequest } from '~/api/utils/api-requests';

import { auditQueries } from './queries';

export const searchAuditsQueryOptions = <T = PageFullAuditInfo>(
  query: { types: string[]; pageable: Pageable },
  searchRequest: SearchRequest,
  options?: UseCustomQueryOptions<PageFullAuditInfo, unknown, T>,
) =>
  queryOptions({
    ...auditQueries.list(query, searchRequest),
    placeholderData: keepPreviousData,
    ...options,
  });

export const commonAuditQueryParams = {
  types: ['Authentication', 'Password', 'Role', 'User', 'Account', 'ProjectMember', 'GroupMember'],
  pageable: { size: 99_999, page: 0 },
};
