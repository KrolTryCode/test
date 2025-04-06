// src/api/queries/diagrams/delete-diagram.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useDeleteDiagramMutation = (
  options?: UseCustomMutationOptions<void, unknown, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diagramId) => ApiClientSecured.diagramsV1Controller.deleteDiagram(diagramId),
    ...options,
    onSuccess(data, diagramId, context) {
      // Инвалидируем все запросы диаграмм, чтобы гарантировать обновление
      queryClient.invalidateQueries({ queryKey: ['diagram'] });

      // Принудительно запрашиваем все запросы, которые могут содержать этот diagramId
      queryClient.refetchQueries({
        queryKey: ['diagram', 'byProjectId']
      });

      // Вызываем пользовательский обработчик успеха, если он предоставлен
      options?.onSuccess?.(data, diagramId, context);
    },
  });
};
