import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CreateTaskRequest, Task } from '~/api/utils/api-requests';

export const useCreateProjectTaskMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<Task, unknown, CreateTaskRequest>,
) => {
  const queryClient = useQueryClient();
  // TODO тип таски передается в двух местах; пока что в системе только один тип - indanis-calculation-task
  return useMutation<Task, unknown, CreateTaskRequest>({
    mutationFn: data =>
      ApiClientSecured.projectTasksV1Controller.create(projectId, 'indanis-calculation-task', data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries.tasks(projectId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
