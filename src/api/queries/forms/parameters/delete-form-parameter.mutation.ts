import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formParametersQueries } from '~/api/queries/forms/parameters/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useDeleteFormParameterMutation = (
  formId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: id => ApiClientSecured.parameterFieldV1Controller.deleteParameterField(formId, id),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: formParametersQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
