import { GridColumnVisibilityModel, GridRowGroupingModel } from '@mui/x-data-grid-premium/';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { MutableRefObject, useCallback, useLayoutEffect, useMemo } from 'react';

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

  const saveSnapshot = useCallback(() => {
    if (gridRef?.current?.exportState) {
      const currentState = gridRef.current.exportState();

      saveColumnsVisibilityModel &&
        updateColumnsVisibilityModelLS(
          currentState.columns?.columnVisibilityModel,
          currentState.rowGrouping?.model,
          postfix,
        );
    }
  }, [gridRef, saveColumnsVisibilityModel, postfix]);

  useLayoutEffect(() => {
    const setColumnVisibilityModelFromLS = () => {
      const model = localStorage.get(LSKeys.ColumnsHiddenList, { postfix });
      if (model && Object.keys(model).length) {
        gridRef?.current?.setColumnVisibilityModel(model);
      }
    };

    setColumnVisibilityModelFromLS();

    window.addEventListener('beforeunload', saveSnapshot);
    return () => {
      window.removeEventListener('beforeunload', saveSnapshot);
      saveSnapshot();
    };
  }, [gridRef, postfix, saveSnapshot]);

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
