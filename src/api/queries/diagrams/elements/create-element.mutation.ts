// src/api/queries/diagrams/elements/create-element.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Element, ElementProperties } from '~/api/utils/api-requests';

export const useCreateElementMutation = (
  diagramId: string,
  options?: UseCustomMutationOptions<Element, unknown, ElementProperties>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (elementProperties) =>
      ApiClientSecured.diagramsV1Controller.createElement(diagramId, elementProperties),
    ...options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
      options?.onSuccess?.(...args);
    },
  });
};
