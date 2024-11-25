import { useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { fileQueries } from './queries';

export const useGetFileTextContentQuery = (
  fileId: string,
  options?: UseCustomQueryOptions<string>,
) => {
  return useQuery({
    ...fileQueries.getFileTextContent(fileId),
    enabled: !!fileId,
    ...options,
  });
};
