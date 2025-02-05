import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { formsQueries } from './queries';

export const useArchiveFormMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<object, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<object, unknown, string>({
    mutationFn: formId => ApiClientSecured.parameterFormV1Controller.deleteParameterForm(formId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: formsQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
