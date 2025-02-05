import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formParametersQueries } from '~/api/queries/forms/parameters/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ParameterField } from '~/api/utils/api-requests';

export const useUpdateFormParameterMutation = (
  formId: string,
  options?: UseCustomMutationOptions<ParameterField, Error, ParameterField>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data =>
      ApiClientSecured.parameterFieldV1Controller.updateParameterField(formId, data.id, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: formParametersQueries.list(formId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
