import { useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { File } from '~/api/utils/api-requests';

import { fileQueries } from './queries';

export const useGetFileQuery = (fileId: string, options?: UseCustomQueryOptions<File>) =>
  useQuery({
    ...fileQueries.downloadFile(fileId, { format: 'blob' }),
    enabled: !!fileId,
    ...options,
  });
