import {
  DataGridPremiumProps,
  GridFeatureMode,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridRowGroupingModel,
} from '@mui/x-data-grid-premium';
import { useCallback, useEffect, useState } from 'react';

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
  onPagingChangeSync: (options: Partial<GridPagingParams>) => void;
  rowGroupingModel: Pick<DataGridProps, 'rowGroupingModel'>['rowGroupingModel'];
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
  rowGroupingModel = DEFAULT_GRID_PAGING_PARAMS.groupingModel,
  onPagingChanged,
  onPagingChangeSync,
}: PagingProps): UsePagingReturn => {
  const initialPagingParams: GridPagingParams = {
    ...DEFAULT_GRID_PAGING_PARAMS,
    groupingModel: rowGroupingModel,
  };
  const [pagingParams, setPagingParams] = useState<GridPagingParams>(initialPagingParams);

  useEffect(() => {
    onPagingChanged?.(pagingParams);
  }, [onPagingChangeSync, onPagingChanged, pagingParams]);

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

  const onFilterModelChange = useCallback(
    (model: GridFilterModel) => {
      handlePagingChange('filterModel', model);
      onPagingChangeSync({ filterModel: model });
    },
    [handlePagingChange, onPagingChangeSync],
  );

  const onPaginationModelChange = useCallback(
    (model: GridPaginationModel) => {
      handlePagingChange('paginationModel', model);
      onPagingChangeSync({ paginationModel: model });
    },
    [handlePagingChange, onPagingChangeSync],
  );

  const onSortModelChange = useCallback(
    (model: GridSortModel) => {
      handlePagingChange('sortModel', model);
      onPagingChangeSync({ sortModel: model });
    },
    [handlePagingChange, onPagingChangeSync],
  );

  const onRowGroupingModelChange = useCallback(
    (model: GridRowGroupingModel) => {
      handlePagingChange('groupingModel', model);
      onPagingChangeSync({ groupingModel: model });
    },
    [handlePagingChange, onPagingChangeSync],
  );

  return {
    rowCount: (paginationMode ?? pagingMode) === 'server' ? totalCount : undefined,
    //paging mode
    sortingMode: sortingMode ?? pagingMode,
    paginationMode: paginationMode ?? pagingMode,
    filterMode: filterMode ?? pagingMode,
    //paging
    filterModel: pagingParams.filterModel,
    onFilterModelChange,
    paginationModel: pagingParams.paginationModel,
    onPaginationModelChange,
    sortModel: pagingParams.sortModel,
    onSortModelChange,
    rowGroupingModel: pagingParams.groupingModel,
    onRowGroupingModelChange,
  };
};
