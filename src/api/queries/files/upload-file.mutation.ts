import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { File } from '~/api/utils/api-requests';
import { showErrorMessage } from '~/utils/show-error-message';

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
    mutationKey: ['files', 'upload'],
    mutationFn: async ({ file, fileId }) =>
      await ApiClientSecured.filesV1Controller.uploadFiles(fileId, { file }),
    onError: e => {
      if (e instanceof AxiosError && e.response?.status === 413) {
        showErrorMessage(e, 'FILES.ERROR.TOO_BIG');
      } else {
        showErrorMessage(e, 'FILES.UPLOAD_FAILED');
      }
    },
    ...options,
  });
};
