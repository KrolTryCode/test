import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType, RequestParams } from '~/api/utils/api-requests';

export const fileQueries = createQueryKeys('files', {
  getFileTextContent: (fileId: string) => ({
    queryKey: [fileId],
    queryFn: () =>
      ApiClientSecured.filesV1Controller.downloadFile(fileId, {
        type: ContentType.Text,
      }) as Promise<string>,
  }),
  downloadFile: (fileId: string, params?: RequestParams) => ({
    queryKey: [fileId],
    queryFn: async () => {
      return ApiClientSecured.filesV1Controller.downloadFile(fileId, params);
    },
  }),
  downloadImage: (imageId: string, params?: RequestParams) => ({
    queryKey: [imageId],
    queryFn: async () => {
      return ApiClientSecured.filesV1Controller.downloadImage(imageId, params);
    },
  }),
});
