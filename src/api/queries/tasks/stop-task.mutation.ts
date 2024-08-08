import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';
import { Task } from '../../utils/api-requests';

type StopTaskParams = {
  taskId: string;
};

export const useStopTaskMutation = (
  options?: UseCustomMutationOptions<Task, unknown, StopTaskParams>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, StopTaskParams>({
    mutationKey: ['tasks', 'all'],
    mutationFn: async ({ taskId }) => await ApiClientSecured.tasksV1Controller.stopTask(taskId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['tasks', 'all'] });
      options?.onSuccess?.(...args);
    },
  });
};
