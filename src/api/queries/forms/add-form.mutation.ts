import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateProjectParameterFormRequest, ParameterForm } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { formsQueries } from './queries';

export const useAddFormMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ParameterForm, unknown, CreateProjectParameterFormRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ParameterForm, unknown, CreateProjectParameterFormRequest>({
    mutationFn: data =>
      ApiClientSecured.projectParameterFormV1Controller.createProjectParameterForm(projectId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: formsQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
