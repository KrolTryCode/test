import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { fileQueries } from './queries';

export const getFileTextContentQueryOptions = (
  fileId: string,
  options?: UseCustomQueryOptions<string>,
) => {
  return queryOptions({
    ...fileQueries.getFileTextContent(fileId),
    enabled: !!fileId,
    ...options,
  });
};
