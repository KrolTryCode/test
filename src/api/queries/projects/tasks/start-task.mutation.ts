import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Task } from '~/api/utils/api-requests';

export const useStartProjectTaskMutation = (
  options?: UseCustomMutationOptions<Task, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, string>({
    mutationFn: taskId => ApiClientSecured.tasksV1Controller.startTask(taskId),
    ...options,
    onSuccess(...args) {
      const [variables] = args;
      void queryClient.invalidateQueries({ queryKey: projectQueries.tasks._def });
      void queryClient.invalidateQueries({ queryKey: projectQueries.task(variables.id!).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
