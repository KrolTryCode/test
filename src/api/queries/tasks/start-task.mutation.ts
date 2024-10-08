import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ALL_KEY, TASKS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';
import { Task } from '../../utils/api-requests';

export const useStartTaskMutation = (
  taskId: string,
  invalidateAll?: boolean,
  options?: UseCustomMutationOptions<Task, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, string>({
    mutationFn: async () => await ApiClientSecured.tasksV1Controller.startTask(taskId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: [TASKS_KEY, invalidateAll ? ALL_KEY : taskId],
      });
      options?.onSuccess?.(...args);
    },
  });
};
