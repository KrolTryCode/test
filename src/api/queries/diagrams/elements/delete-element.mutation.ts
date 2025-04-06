// src/api/queries/diagrams/elements/delete-element.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useDeleteElementMutation = (
  diagramId: string,
  options?: UseCustomMutationOptions<void, unknown, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (elementId) =>
      ApiClientSecured.diagramsV1Controller.deleteElement(diagramId, elementId),
    ...options,
    onSuccess(...args) {
      // Инвалидируем кеш элементов диаграммы
      queryClient.invalidateQueries({ queryKey: ['diagram', 'elements', diagramId] });
      options?.onSuccess?.(...args);
    },
  });
};
