import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FORMS_MOCK_SERVER_URLS } from '~/api/mocks/forms/controller';
import { TaskFormData, TaskFormInput } from '~/api/mocks/forms/types';
import { formQueries } from '~/api/tasks/forms/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';

export const useCreateFormMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<TaskFormData, Error, TaskFormInput>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    //TODO: add API call
    mutationFn: data =>
      ApiClientSecured.request({
        path: FORMS_MOCK_SERVER_URLS.CREATE,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: formQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
