import { GridColumnVisibilityModel, GridRowGroupingModel } from '@mui/x-data-grid-premium/';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
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
}

// https://mui.com/x/react-data-grid/state/#save-and-restore-the-state-from-external-storage
export const useSyncGridState = (
  gridRef: MutableRefObject<GridApiPremium>,
  { gridId = '', saveColumnsVisibilityModel }: SyncGridStateOptions,
) => {
  const postfix = useMemo(() => getSavedPath(window.location.pathname, gridId), [gridId]);
  const exactPostfix = useMemo(
    () => getSavedPath(window.location.pathname, gridId, false),
    [gridId],
  );

  //#region save state to ls callbacks
  const onColumnVisibilityModelChange = useCallback(() => {
    const currentState = gridRef?.current?.exportState?.();
    saveColumnsVisibilityModel &&
      currentState &&
      updateColumnsVisibilityModelLS(
        currentState.columns?.columnVisibilityModel,
        currentState.rowGrouping?.model,
        postfix,
      );
  }, [gridRef, postfix, saveColumnsVisibilityModel]);

  const onPagingChangeSync = useCallback(
    (updated: Partial<GridPagingParams>) => updatePagingLS(updated, exactPostfix),
    [exactPostfix],
  );

  //#endregion

  const setPagingFromLS = useCallback(() => {
    const paging = localStorage.get(LSKeys.PagingParams, { postfix: exactPostfix });

    if (paging?.filterModel) {
      gridRef.current.setFilterModel(paging.filterModel);
    }
    if (paging?.groupingModel) {
      gridRef.current.setRowGroupingModel(paging.groupingModel);
    }
    if (paging?.sortModel) {
      gridRef.current.setSortModel(paging.sortModel);
    }
    if (paging?.paginationModel) {
      gridRef?.current?.setPaginationModel(paging.paginationModel);
    }
  }, [exactPostfix, gridRef]);

  const setColumnVisibilityModelFromLS = useCallback(() => {
    const model = localStorage.get(LSKeys.ColumnsHiddenList, { postfix });
    if (model && Object.keys(model).length) {
      gridRef?.current?.setColumnVisibilityModel(model);
    }
  }, [gridRef, postfix]);

  useLayoutEffect(() => {
    const applyStateFromLS = () => {
      setColumnVisibilityModelFromLS();
      setPagingFromLS();
    };
    applyStateFromLS();

    window.addEventListener('fullscreenchange', applyStateFromLS);
    return () => {
      window.removeEventListener('fullscreenchange', applyStateFromLS);
    };
  }, [gridRef, setColumnVisibilityModelFromLS, setPagingFromLS]);

  return { onColumnVisibilityModelChange, onPagingChangeSync };
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

function updatePagingLS(pagingParams: Partial<GridPagingParams>, postfix: string) {
  const prevParams = localStorage.get(LSKeys.PagingParams, { postfix });

  localStorage.set(
    LSKeys.PagingParams,
    prevParams ? { ...prevParams, ...pagingParams } : pagingParams,
    { postfix },
  );
}
