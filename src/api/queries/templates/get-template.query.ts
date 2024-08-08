import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '~/api/utils/api-client';
import { Template } from '~/api/utils/api-requests';

export const useGetTemplateQuery = <T = Template>(
  templateId: string,
  options?: UseCustomQueryOptions<Template, AxiosError<ErrorResponse>, T>,
): UseQueryResult<T, AxiosError<ErrorResponse>> => {
  return useQuery({
    queryKey: ['templates', templateId],
    queryFn: async () => await ApiClientSecured.templatesV1Controller.getTemplateById(templateId),
    ...options,
  });
};
