import { GridLogicOperator, GridSortDirection } from '@mui/x-data-grid-premium';
import {
  DEFAULT_GRID_PAGING_PARAMS,
  GridPagingParams,
  serviceRowGroupPrefix,
  GridFilterOperatorValue,
} from '@pspod/ui-components';
import { useDeferredValue, useMemo } from 'react';

import { SearchOperation, SearchRequest } from '~/api/utils/api-requests';

export interface ServerPagingParams {
  filters: SearchRequest;
  pageAndSort?: {
    /**
     * Zero-based page index (0..N)
     * @min 0
     * @default 0
     */
    page?: number;
    /**
     * The size of the page to be returned
     * @min 1
     * @default 20
     */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };
}

type InnerSortEntry = [string, GridSortDirection];

export function useServerPagingParams(gridPagingParams: GridPagingParams = {}): ServerPagingParams {
  const { filterModel, paginationModel, sortModel, groupingModel } =
    useDeferredValue(gridPagingParams);

  const combinedSort = useMemo<InnerSortEntry[]>(() => {
    const res: InnerSortEntry[] = groupingModel?.map(field => [field, 'asc']) ?? [];

    for (const { field, sort } of sortModel ?? []) {
      const GROUPING_FIELD_REGEXP = new RegExp(`${serviceRowGroupPrefix}(.+)__`);
      const groupingMatches = GROUPING_FIELD_REGEXP.exec(field);
      const finalFieldName = groupingMatches?.[1] ?? field;

      const groupingEntry = res.find(([key]) => key === finalFieldName);

      if (groupingEntry) {
        groupingEntry[1] = sort;
      } else {
        res.push([field, sort]);
      }
    }

    return res;
  }, [groupingModel, sortModel]);

  return {
    filters: {
      criteria:
        filterModel?.items
          .map(({ field, operator, value }) => ({
            key: field,
            operation: getServerFilterOperator(
              operator as GridFilterOperatorValue,
            ) as SearchOperation,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value,
            orPredicate: filterModel.logicOperator === GridLogicOperator.Or,
          }))
          //kinda fail-safe
          .filter(({ operation, value }) => operation !== null && value !== undefined) ?? [],
    },
    pageAndSort: {
      sort: combinedSort?.map(([field, sort]) => `${field},${sort ?? 'asc'}`),
      page: paginationModel?.page ?? DEFAULT_GRID_PAGING_PARAMS.paginationModel.page,
      size: paginationModel?.pageSize ?? DEFAULT_GRID_PAGING_PARAMS.paginationModel.pageSize,
    },
  };
}

function getServerFilterOperator(operator: GridFilterOperatorValue): SearchOperation | null {
  switch (operator) {
    case GridFilterOperatorValue.EqualSign:
    case GridFilterOperatorValue.Is:
    case GridFilterOperatorValue.Equals:
      return SearchOperation.Equals;

    case GridFilterOperatorValue.NotEqualSign:
    case GridFilterOperatorValue.Not:
      return SearchOperation.NotEquals;

    case GridFilterOperatorValue.GTESign:
    case GridFilterOperatorValue.OnOrAfter:
      return SearchOperation.GreaterOrEquals;

    case GridFilterOperatorValue.LTESign:
    case GridFilterOperatorValue.OnOrBefore:
      return SearchOperation.LessOrEquals;

    case GridFilterOperatorValue.Contains:
      return SearchOperation.Contains;

    case GridFilterOperatorValue.StartsWith:
      return SearchOperation.StartWith;

    case GridFilterOperatorValue.EndsWith:
      return SearchOperation.EndWith;

    case GridFilterOperatorValue.IsAnyOf:
      return SearchOperation.In;

    default:
      console.warn(
        `Unprocessed grid operator "${operator as string}". The expression will be ignored`,
      );
      return null;
  }
}
