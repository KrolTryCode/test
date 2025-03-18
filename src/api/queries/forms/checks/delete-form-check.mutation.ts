import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { formCheckQueries } from './queries';

export const useDeleteFormCheckMutation = (
  formId: string,
  fieldId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkId =>
      ApiClientSecured.parameterFieldCheckV1Controller.deleteParameterField1(
        formId,
        fieldId,
        checkId,
      ),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: formCheckQueries.list(formId, fieldId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
