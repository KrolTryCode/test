import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '~/api/utils/api-client';
import { Template } from '~/api/utils/api-requests';

import { templateQueries } from './queries';

interface MutationFnVariables {
  templateId: string;
  content: string;
}

export const useUpdateTemplateMutation = (
  options?: UseCustomMutationOptions<Template, AxiosError<ErrorResponse>, MutationFnVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Template, AxiosError<ErrorResponse>, MutationFnVariables>({
    mutationFn: ({ templateId, content }) =>
      ApiClientSecured.templatesV1Controller.updateTemplate(templateId, { content }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: templateQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
