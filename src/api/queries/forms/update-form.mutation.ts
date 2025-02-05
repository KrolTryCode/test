import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ParameterForm, UpdateParameterFormRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { formsQueries } from './queries';

export const useUpdateFormMutation = (
  projectId: string,
  formId: string,
  options?: UseCustomMutationOptions<ParameterForm, unknown, UpdateParameterFormRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ParameterForm, unknown, UpdateParameterFormRequest>({
    mutationFn: data =>
      ApiClientSecured.parameterFormV1Controller.updateParameterForm(formId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: formsQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
