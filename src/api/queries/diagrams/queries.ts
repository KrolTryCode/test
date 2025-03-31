// src/api/queries/diagrams/queries.ts
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const diagramQueries = createQueryKeys('diagram', {
  byProjectId: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.diagramsV1Controller.getDiagrams(projectId),
  }),
  byId: (diagramId: string) => ({
    queryKey: [diagramId],
    queryFn: () => ApiClientSecured.diagramsV1Controller.getDiagram(diagramId),
  }),
  elements: (diagramId: string) => ({
    queryKey: [diagramId, 'elements'],
    queryFn: () => ApiClientSecured.diagramsV1Controller.getElementsByDiagramId(diagramId),
  }),
  elementFiles: (diagramId: string) => ({
    queryKey: [diagramId, 'elementFiles'],
    queryFn: () => ApiClientSecured.diagramsV1Controller.getElementFilesByDiagramId(diagramId),
  }),
});
