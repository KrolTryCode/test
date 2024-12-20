import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '~/api/utils/api-client';
import { ApplicationFile } from '~/api/utils/api-requests';

interface CreateApplicationFileRequest {
  type: 'mainLogo' | 'loginLogo';
  originalName: string;
}

export const useCreateApplicationFile = (
  options?: UseCustomMutationOptions<
    ApplicationFile,
    AxiosError<ErrorResponse>,
    CreateApplicationFileRequest
  >,
) => {
  return useMutation<ApplicationFile, AxiosError<ErrorResponse>, CreateApplicationFileRequest>({
    mutationFn: ({ type, originalName }) =>
      ApiClientSecured.applicationFileV1Controller.createApplicationFile(type, { originalName }),
    ...options,
  });
};
