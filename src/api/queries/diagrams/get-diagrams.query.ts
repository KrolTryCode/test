// src/api/queries/diagrams/get-diagrams.query.ts
import { queryOptions } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Diagram } from '~/api/utils/api-requests';

export const getDiagramsQueryOptions = <T = Diagram[]>(
  projectId: string,
  options?: UseCustomQueryOptions<Diagram[], unknown, T>
) =>
  queryOptions({
    ...diagramQueries.byProjectId(projectId),
    ...options,
  });
