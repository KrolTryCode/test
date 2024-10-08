import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Task, TaskUpdateRequest } from '~/api/utils/api-requests';
import { TASKS_KEY, TASKS_TREE_KEY } from '~/api/utils/query-keys';

type TaskUpdate = TaskUpdateRequest & { taskId: string };

export const useUpdateTaskMutation = (
  options?: UseCustomMutationOptions<Task, unknown, TaskUpdate>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, TaskUpdate>({
    mutationFn: async ({ taskId, ...taskData }) =>
      await ApiClientSecured.tasksV1Controller.updateTask(taskId, taskData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [TASKS_TREE_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
