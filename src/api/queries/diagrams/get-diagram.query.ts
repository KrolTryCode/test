// src/api/queries/diagrams/get-diagram.query.ts
import { queryOptions } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Diagram } from '~/api/utils/api-requests';

export const getDiagramQueryOptions = <T = Diagram>(
  diagramId: string,
  options?: UseCustomQueryOptions<Diagram, unknown, T>
) =>
  queryOptions({
    ...diagramQueries.byId(diagramId),
    ...options,
  });
