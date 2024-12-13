import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectFile, ProjectFileData } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

interface Data extends ProjectFileData {
  type: string;
}

export const useCreateProjectFileMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ProjectFile, unknown, Data>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectFile, unknown, Data>({
    mutationFn: data =>
      ApiClientSecured.projectFilesV1Controller.createProjectFile(projectId, data.type, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries.single(projectId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
