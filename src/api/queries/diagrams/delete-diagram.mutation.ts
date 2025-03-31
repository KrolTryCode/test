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
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: diagramQueries.all._def });
      options?.onSuccess?.(...args);
    },
  });
};
