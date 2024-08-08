import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Task, TaskUpdateRequest } from '~/api/utils/api-requests';

type TaskUpdate = TaskUpdateRequest & { taskId: string };

export const useUpdateTaskMutation = (
  options?: UseCustomMutationOptions<Task, unknown, TaskUpdate>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, TaskUpdate>({
    mutationKey: ['tasks', 'update'],
    mutationFn: async ({ taskId, ...taskData }) =>
      await ApiClientSecured.tasksV1Controller.updateTask(taskId, taskData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
      options?.onSuccess?.(...args);
    },
  });
};
