import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Check, ParameterFieldCheck } from '~/api/utils/api-requests';

import { formCheckQueries } from './queries';

export const useAddFormCheckMutation = (
  formId: string,
  fieldId: string,
  options?: UseCustomMutationOptions<ParameterFieldCheck, unknown, Check>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkData =>
      ApiClientSecured.parameterFieldCheckV1Controller.addParameterFieldCheck(
        formId,
        fieldId,
        checkData,
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
