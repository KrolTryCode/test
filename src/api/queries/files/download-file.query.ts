import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { File, RequestParams } from '~/api/utils/api-requests';

import { fileQueries } from './queries';

export const getFileQueryOptions = (
  fileId: string,
  options?: UseCustomQueryOptions<File> & { params?: RequestParams },
) => {
  const { params, ...restOptions } = options ?? {};
  return queryOptions({
    ...fileQueries.downloadFile(fileId, params),
    enabled: !!fileId,
    ...restOptions,
  });
};
