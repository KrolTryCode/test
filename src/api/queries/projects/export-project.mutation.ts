import { useMutation } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { File } from '~/api/utils/api-requests';

export const useExportProjectMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<File, unknown, string[]>,
) => {
  return useMutation<File, Error, string[]>({
    mutationFn: types =>
      ApiClientSecured.projectNodeV1Controller.exportProject(
        projectId,
        { types },
        { format: 'blob' },
      ),
    ...options,
  });
};
