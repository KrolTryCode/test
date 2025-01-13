import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FORM_PARAMETERS_MOCK_SERVER_URLS } from '~/api/mocks/forms/parameters/controller';
import { FormParameter, FormParameterInput } from '~/api/mocks/forms/parameters/types';
import { formParametersQueries } from '~/api/tasks/forms/parameters/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';

export const useUpdateFormParameterMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<FormParameter, Error, FormParameterInput>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    //TODO: add API call
    mutationFn: data =>
      ApiClientSecured.request({
        path: FORM_PARAMETERS_MOCK_SERVER_URLS.UPDATE,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: formParametersQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
