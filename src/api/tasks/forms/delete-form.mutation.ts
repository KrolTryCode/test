import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FORMS_MOCK_SERVER_URLS } from '~/api/mocks/forms/controller';
import { formQueries } from '~/api/tasks/forms/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';

export const useDeleteFormMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    //TODO: add API call
    mutationFn: id =>
      ApiClientSecured.request({
        path: FORMS_MOCK_SERVER_URLS.DELETE + '/' + id,
        method: 'DELETE',
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
