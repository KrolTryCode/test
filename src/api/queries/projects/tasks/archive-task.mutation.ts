import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useArchiveTaskMutation = (
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: taskId => ApiClientSecured.tasksV1Controller.deleteTask(taskId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries.tasks._def });
      options?.onSuccess?.(...args);
    },
  });
};
