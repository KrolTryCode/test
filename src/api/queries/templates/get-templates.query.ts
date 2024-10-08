import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '~/api/utils/api-client';
import { Template } from '~/api/utils/api-requests';
import { ALL_KEY, TEMPLATES_KEY } from '~/api/utils/query-keys';

export const useGetTemplatesQuery = <T = Template[]>(
  options?: UseCustomQueryOptions<Template[], AxiosError<ErrorResponse>, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [TEMPLATES_KEY, ALL_KEY],
    queryFn: async () => await ApiClientSecured.templatesV1Controller.getAllTemplates(),
    ...options,
  });
};
