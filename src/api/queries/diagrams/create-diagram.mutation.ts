// src/api/queries/diagrams/create-diagram.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Diagram, DiagramRequest } from '~/api/utils/api-requests';

export const useCreateDiagramMutation = (
  options?: UseCustomMutationOptions<Diagram, unknown, DiagramRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ApiClientSecured.diagramsV1Controller.createDiagram(data),
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
      // Вызываем пользовательский обработчик успеха, если он предоставлен
      options?.onSuccess?.(data, variables, context);
    },
  });
};
