// src/api/queries/diagrams/update-diagram.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Diagram, DiagramRequest } from '~/api/utils/api-requests';

export const useUpdateDiagramMutation = (
  diagramId: string,
  options?: UseCustomMutationOptions<Diagram, unknown, DiagramRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      console.log(`Updating diagram ${diagramId} with data:`, data);
      return ApiClientSecured.diagramsV1Controller.updateDiagram(diagramId, data);
    },
    ...options,
    onSuccess(data, variables, context) {
      // Инвалидируем все запросы диаграмм
      queryClient.invalidateQueries({ queryKey: ['diagram'] });
      // Принудительно обновим список диаграмм для конкретного проекта
      if (variables.projectId) {
        queryClient.invalidateQueries({
          queryKey: ['diagram', 'byProjectId', variables.projectId]
        });
      }
      // Конкретную диаграмму тоже инвалидируем
      queryClient.invalidateQueries({
        queryKey: ['diagram', 'byId', diagramId]
      });

      // Вызываем пользовательский обработчик успеха, если он предоставлен
      options?.onSuccess?.(data, variables, context);
    },
  });
};
