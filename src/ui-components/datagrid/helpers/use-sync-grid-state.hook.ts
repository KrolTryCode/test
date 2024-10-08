import { GridColumnVisibilityModel, GridRowGroupingModel } from '@mui/x-data-grid-premium/';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { GridInitialStatePremium } from '@mui/x-data-grid-premium/models/gridStatePremium';
import { MutableRefObject, useCallback, useLayoutEffect, useMemo } from 'react';

import { GridPagingParams } from '../datagrid.types';

import {
  getSavedPath,
  tableDataLocalStorageService as localStorage,
  TableDataStorageKey as LSKeys,
} from './local-storage';

interface SyncGridStateOptions {
  gridId?: string;
  saveColumnsVisibilityModel: boolean;
  initialState?: GridInitialStatePremium;
}

// https://mui.com/x/react-data-grid/state/#save-and-restore-the-state-from-external-storage
export const useSyncGridState = (
  gridRef: MutableRefObject<GridApiPremium>,
  { gridId = '', saveColumnsVisibilityModel, initialState }: SyncGridStateOptions,
) => {
  const postfix = useMemo(() => getSavedPath(window.location.pathname, gridId), [gridId]);
  const exactPostfix = useMemo(
    () => getSavedPath(window.location.pathname, gridId, false),
    [gridId],
  );

  const saveSnapshot = useCallback(() => {
    if (gridRef?.current?.exportState) {
      const currentState = gridRef.current.exportState();

      updatePagingLS(
        {
          paginationModel: currentState.pagination
            ?.paginationModel as GridPagingParams['paginationModel'],
          filterModel: currentState.filter?.filterModel,
          groupingModel: currentState.rowGrouping?.model,
          sortModel: currentState.sorting?.sortModel,
        },
        exactPostfix,
      );

      saveColumnsVisibilityModel &&
        updateColumnsVisibilityModelLS(
          currentState.columns?.columnVisibilityModel,
          currentState.rowGrouping?.model,
          postfix,
        );
    }
  }, [gridRef, exactPostfix, saveColumnsVisibilityModel, postfix]);

  const setPagingFromLS = useCallback(() => {
    const paging = localStorage.get(LSKeys.PagingParams, { postfix: exactPostfix });

    if (paging?.filterModel) {
      gridRef.current.setFilterModel({ items: paging.filterModel.items });
    }
    if (paging?.groupingModel) {
      gridRef.current.setRowGroupingModel(paging?.groupingModel);
    }
    if (paging?.sortModel) {
      gridRef.current.setSortModel(paging?.sortModel);
    }
    if (paging?.paginationModel) {
      gridRef?.current?.setPaginationModel(paging?.paginationModel);
    }
  }, [exactPostfix, gridRef]);

  const setColumnVisibilityModelFromLS = useCallback(() => {
    const model = {
      ...initialState?.columns?.columnVisibilityModel,
      ...localStorage.get(LSKeys.ColumnsHiddenList, { postfix }),
    };
    if (model && Object.keys(model).length) {
      gridRef.current.setColumnVisibilityModel(model);
    }
  }, [gridRef, initialState?.columns?.columnVisibilityModel, postfix]);

  useLayoutEffect(() => {
    setColumnVisibilityModelFromLS();
    setPagingFromLS();

    window.addEventListener('beforeunload', saveSnapshot);
    return () => {
      window.removeEventListener('beforeunload', saveSnapshot);
      saveSnapshot();
    };
  }, [
    saveSnapshot,
    setColumnVisibilityModelFromLS,
    setPagingFromLS,
    initialState?.columns?.columnVisibilityModel,
  ]);

  const setColumnWidthsFromLS = () => {
    const widths = localStorage.get(LSKeys.ColumnsWidth, { postfix });
    widths &&
      Object.entries(widths).forEach(([field, width]) => {
        gridRef.current.setColumnWidth(field, width);
      });
  };

  return { setColumnWidthsFromLS };
};

function updateColumnsVisibilityModelLS(
  model: GridColumnVisibilityModel | undefined,
  groupingModel: GridRowGroupingModel | undefined,
  postfix: string,
) {
  if (model && Object.keys(model).length) {
    // при группировке ключ колонки попадает в модель видимости, не сохраняем
    groupingModel?.forEach(groupingKey => {
      delete model[groupingKey];
    });
    localStorage.set(LSKeys.ColumnsHiddenList, model, { postfix });
  } else {
    localStorage.remove(LSKeys.ColumnsHiddenList, { postfix });
  }
}

function updatePagingLS(pagingParams: GridPagingParams, postfix: string) {
  localStorage.set(LSKeys.PagingParams, pagingParams, { postfix });
}
