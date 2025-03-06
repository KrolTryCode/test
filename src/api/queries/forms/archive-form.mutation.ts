import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { formsQueries } from './queries';

export const useArchiveFormMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: formId =>
      ApiClientSecured.projectParameterFormV1Controller.deleteProjectParameterForm(
        projectId,
        formId,
      ),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: formsQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
