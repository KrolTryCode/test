// src/api/queries/diagrams/elements/update-element.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Element, ElementProperties } from '~/api/utils/api-requests';

export const useUpdateElementMutation = (
  diagramId: string,
  elementId: string,
  options?: UseCustomMutationOptions<Element, unknown, { elementId: string, elementProperties: ElementProperties }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({elementId, elementProperties}) =>
      ApiClientSecured.diagramsV1Controller.updateElement(diagramId, elementId, elementProperties),
    ...options,
    onSuccess(...args) {
      // Инвалидируем кеш элементов диаграммы
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
      options?.onSuccess?.(...args);
    },
  });
};

