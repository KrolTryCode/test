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
    mutationFn: (data) => ApiClientSecured.diagramsV1Controller.updateDiagram(diagramId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: diagramQueries.all._def });
      void queryClient.invalidateQueries({ queryKey: diagramQueries.byId(diagramId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
