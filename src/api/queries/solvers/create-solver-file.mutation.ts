import { useMutation } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { File, SolverFile } from '~/api/utils/api-requests';

interface UploadSolverFileRequest {
  solverId: string;
  file: File;
}

export const useCreateSolverFile = (
  projectId: string,
  options?: UseCustomMutationOptions<SolverFile, Error, UploadSolverFileRequest>,
) => {
  return useMutation({
    mutationFn: ({ solverId, file }) =>
      ApiClientSecured.projectSolversV1Controller.createSolverFiles(projectId, solverId, { file }),
    ...options,
  });
};
