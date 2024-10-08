import { useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';
import { FILES_KEY } from '~/api/utils/query-keys';

export const useGetFileTextContentQuery = (
  fileId?: string,
  options?: UseCustomQueryOptions<string>,
) => {
  return useQuery({
    queryKey: [FILES_KEY, fileId],
    queryFn: async () => {
      return (await ApiClientSecured.filesV1Controller.downloadFile(fileId ?? '', {
        type: ContentType.Text,
      })) as string;
    },
    enabled: !!fileId,
    ...options,
  });
};
