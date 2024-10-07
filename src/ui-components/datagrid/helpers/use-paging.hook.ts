import { DataGridPremiumProps, GridFeatureMode } from '@mui/x-data-grid-premium';
import { useCallback, useState } from 'react';

import { DEFAULT_GRID_PAGING_PARAMS } from '../datagrid.consts';
import { DataGridProps, GridPagingParams } from '../datagrid.types';

interface PagingProps {
  totalCount?: number;
  pagingMode?: GridFeatureMode;
  sortingMode?: GridFeatureMode;
  paginationMode?: GridFeatureMode;
  filterMode?: GridFeatureMode;
  paging?: GridPagingParams;
  onPagingChanged?: (options: GridPagingParams) => void;
}

interface UsePagingReturn
  extends Pick<DataGridProps, 'sortingMode' | 'paginationMode' | 'filterMode'>,
    Pick<
      DataGridPremiumProps,
      | 'onFilterModelChange'
      | 'onPaginationModelChange'
      | 'onSortModelChange'
      | 'onRowGroupingModelChange'
    > {
  filterModel: GridPagingParams['filterModel'];
  paginationModel: GridPagingParams['paginationModel'];
  sortModel: GridPagingParams['sortModel'];
  rowGroupingModel: GridPagingParams['groupingModel'];
  rowCount?: number;
}

export const usePaging = ({
  totalCount,
  pagingMode = 'client',
  sortingMode,
  paginationMode,
  filterMode,
  paging = DEFAULT_GRID_PAGING_PARAMS,
  onPagingChanged,
}: PagingProps): UsePagingReturn => {
  const [pagingParams, setPagingParams] = useState<GridPagingParams>(paging);

  const handlePagingChange = useCallback(
    (category: keyof GridPagingParams, value: GridPagingParams[keyof GridPagingParams]) => {
      setPagingParams(params => {
        const updated = { ...params, [category]: value };
        const isNotPagination = category !== 'paginationModel';
        if (isNotPagination && updated.paginationModel) {
          updated.paginationModel.page = DEFAULT_GRID_PAGING_PARAMS.paginationModel.page;
        }
        onPagingChanged?.(updated);
        return updated;
      });
    },
    [onPagingChanged],
  );

  return {
    rowCount: (paginationMode ?? pagingMode) === 'server' ? totalCount : undefined,
    //paging mode
    sortingMode: sortingMode ?? pagingMode,
    paginationMode: paginationMode ?? pagingMode,
    filterMode: filterMode ?? pagingMode,
    //paging
    filterModel: pagingParams.filterModel,
    onFilterModelChange: model => handlePagingChange('filterModel', model),
    paginationModel: pagingParams.paginationModel,
    onPaginationModelChange: model => handlePagingChange('paginationModel', model),
    sortModel: pagingParams.sortModel,
    onSortModelChange: model => handlePagingChange('sortModel', model),
    rowGroupingModel: pagingParams.groupingModel,
    onRowGroupingModelChange: model => handlePagingChange('groupingModel', model),
  };
};
