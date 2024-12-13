import { useMutation } from '@tanstack/react-query';

import { File } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export interface UploadFileMutationParams {
  fileId: string;
  file: File;
}

export const useUploadFileMutation = (
  options?: UseCustomMutationOptions<File, unknown, UploadFileMutationParams>,
) => {
  return useMutation<File, unknown, UploadFileMutationParams>({
    mutationFn: ({ file, fileId }) =>
      ApiClientSecured.filesV1Controller.uploadFiles(fileId, { file }),
    ...options,
  });
};
