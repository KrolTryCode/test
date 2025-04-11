import { useMutation } from '@tanstack/react-query';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ElementFile } from '~/api/utils/api-requests';

interface UploadElementFileRequest {
  elementId: string;
  file: File;
}

export const useUploadElementFileMutation = (
  diagramId: string,
  options?: UseCustomMutationOptions<ElementFile, unknown, UploadElementFileRequest>
) => {
  return useMutation({
    mutationFn: ({ elementId, file }) =>
      ApiClientSecured.diagramsV1Controller.createElementFile(diagramId, elementId, file),
    ...options,
  });
};
