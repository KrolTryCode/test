import { EnhancedColDef } from '../datagrid.types';

import { getSavedPath, tableDataLocalStorageService, TableDataStorageKey } from './local-storage';

export const getStoredWidths = (gridId: string) =>
  tableDataLocalStorageService.get(TableDataStorageKey.ColumnsWidth, {
    postfix: getSavedPath(window.location.pathname, gridId),
  });

export const enhanceColDefWidth = (colDef: EnhancedColDef, widths: Record<string, number>) => {
  const width = widths?.[colDef.field];

  if (width) {
    colDef.width = width;
    delete colDef.minWidth;
    delete colDef.maxWidth;
  }
};

export const saveColDefWidth = (colDef: EnhancedColDef, gridId: string): void => {
  if (!colDef.width) {
    return;
  }

  const postfix = getSavedPath(window.location.pathname, gridId);
  const widths = tableDataLocalStorageService.get(TableDataStorageKey.ColumnsWidth, {
    postfix,
  });
  const updatedWidths = { ...(!!widths && widths), [colDef.field]: Math.round(colDef.width) };
  tableDataLocalStorageService.set(TableDataStorageKey.ColumnsWidth, updatedWidths, {
    postfix,
  });
};

export const removeStoredColWidths = (gridId: string) => {
  const postfix = getSavedPath(window.location.pathname, gridId);
  tableDataLocalStorageService.remove(TableDataStorageKey.ColumnsWidth, { postfix });
};
