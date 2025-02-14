import { queryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ErrorResponse } from '~/api/utils/api-client';
import { Template } from '~/api/utils/api-requests';

import { templateQueries } from './queries';

export const getTemplatesQueryOptions = <T = Template[]>(
  options?: UseCustomQueryOptions<Template[], AxiosError<ErrorResponse>, T>,
) =>
  queryOptions({
    ...templateQueries.list,
    ...options,
  });
