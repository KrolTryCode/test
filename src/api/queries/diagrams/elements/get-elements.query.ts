// src/api/queries/diagrams/elements/get-elements.query.ts
import { queryOptions } from '@tanstack/react-query';

import { diagramQueries } from '~/api/queries/diagrams/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Element } from '~/api/utils/api-requests';

export const getElementsQueryOptions = <T = Element[]>(
  diagramId: string,
  options?: UseCustomQueryOptions<Element[], unknown, T>
) =>
  queryOptions({
    ...diagramQueries.elements(diagramId),
    ...options,
  });
