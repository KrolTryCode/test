import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '~/api/utils/api-client';
import { Template } from '~/api/utils/api-requests';

interface MutationFnVariables {
  templateId: string;
  content: string;
}

export const useUpdateTemplateMutation = (
  options?: UseCustomMutationOptions<Template, AxiosError<ErrorResponse>, MutationFnVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Template, AxiosError<ErrorResponse>, MutationFnVariables>({
    mutationKey: ['templates', 'update'],
    mutationFn: async ({ templateId, content }) =>
      await ApiClientSecured.templatesV1Controller.updateTemplate(templateId, { content }),
    ...options,
    onSuccess(...args) {
      const templateId = (args.at(0) as Template).id;
      void queryClient.invalidateQueries({ queryKey: ['templates', templateId] });
      options?.onSuccess?.(...args);
    },
  });
};
