import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    mutationKey: ['tasks', taskId],
    mutationFn: async () => await ApiClientSecured.tasksV1Controller.startTask(taskId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['tasks', invalidateAll ? 'all' : taskId] });
      options?.onSuccess?.(...args);
    },
  });
};
