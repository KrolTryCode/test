// src/api/queries/diagrams/elements/get-element-files-by-diagram-id.query.ts
import { queryOptions } from '@tanstack/react-query';
import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ElementFile } from '~/api/utils/api-requests';

export const getElementFilesByDiagramIdQueryOptions = <T = ElementFile[]>(
  diagramId: string,
  options?: UseCustomQueryOptions<ElementFile[], unknown, T>
) =>
  queryOptions({
    ...diagramQueries.elementFiles(diagramId),
    ...options,
  });
