import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ALL_KEY, TASKS_KEY, TASKS_TREE_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';
import { CreateTaskRequest, Task } from '../../utils/api-requests';

interface MutationFnVariables {
  projectId: string;
  taskType: string;
  task: CreateTaskRequest;
}

export const useCreateTaskMutation = (
  options?: UseCustomMutationOptions<Task, unknown, MutationFnVariables>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, MutationFnVariables>({
    mutationFn: async ({ projectId, taskType, task }) =>
      await ApiClientSecured.projectTasksV1Controller.create2(projectId, taskType, task),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [TASKS_KEY, ALL_KEY] });
      void queryClient.invalidateQueries({ queryKey: [TASKS_TREE_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
