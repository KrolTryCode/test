import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Task, TaskUpdateRequest } from '~/api/utils/api-requests';

export const useUpdateTaskMutation = (
  options?: UseCustomMutationOptions<Task, unknown, TaskUpdateRequest & { taskId: string }>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, TaskUpdateRequest & { taskId: string }>({
    mutationFn: data => ApiClientSecured.tasksV1Controller.updateTask(data.taskId, data),
    ...options,
    onSuccess(...args) {
      const [variables] = args;
      void queryClient.invalidateQueries({ queryKey: projectQueries.tasks._def });
      void queryClient.invalidateQueries({ queryKey: projectQueries.task(variables.id!).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
