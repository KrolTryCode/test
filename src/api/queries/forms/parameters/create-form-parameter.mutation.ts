import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formParametersQueries } from '~/api/queries/forms/parameters/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CreateParameterFieldRequest, ParameterField } from '~/api/utils/api-requests';

export const useCreateFormParameterMutation = (
  formId: string,
  options?: UseCustomMutationOptions<ParameterField, Error, CreateParameterFieldRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data => ApiClientSecured.parameterFieldV1Controller.addParameterField(formId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: formParametersQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
