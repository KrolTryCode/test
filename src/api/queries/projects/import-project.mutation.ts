import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectNode } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

export const useUploadProjectFileMutation = (
  options?: UseCustomMutationOptions<ProjectNode, unknown, File>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectNode, unknown, File>({
    mutationFn: file => ApiClientSecured.projectNodeV1Controller.importProject({ file }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries.byParent().queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
