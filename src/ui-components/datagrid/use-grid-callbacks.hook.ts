import { GridCellParams, GridEventListener, GridValidRowModel } from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { MutableRefObject, useCallback } from 'react';

import { DataGridProps } from '~/ui-components/datagrid/datagrid.types';
import { saveColDefWidth } from '~/ui-components/datagrid/helpers/columns-width';

interface UseGridCallbacksProps<T extends GridValidRowModel = any> {
  onRowClick?: DataGridProps<T>['onRowClick'];
  getCellClassName?: DataGridProps<T>['getCellClassName'];
  onColumnResize?: DataGridProps<T>['onColumnResize'];
  apiRef: MutableRefObject<GridApiPremium>;
  hasWidthSaving?: DataGridProps<T>['hasWidthSaving'];
  gridId?: DataGridProps<T>['gridId'];
}

export const useGridCallbacks = <T extends GridValidRowModel>({
  onRowClick,
  getCellClassName,
  onColumnResize,
  apiRef,
  hasWidthSaving,
  gridId,
}: UseGridCallbacksProps<T>) => {
  const handleRowClick = useCallback<GridEventListener<'rowClick'>>(
    (params, event, details) => {
      const rowNode = apiRef.current.getRowNode(params.id);
      if (rowNode && rowNode.type === 'group') {
        apiRef.current.setRowChildrenExpansion(params.id, !rowNode.childrenExpanded);
      }

      onRowClick?.(params, event, details);
    },
    [apiRef, onRowClick],
  );

  const handleColumnResize = useCallback<GridEventListener<'columnResize'>>(
    (params, event, details) => {
      hasWidthSaving && saveColDefWidth(params.colDef, gridId ?? '');
      onColumnResize?.(params, event, details);
    },
    [hasWidthSaving, gridId, onColumnResize],
  );

  const getCellClassNameWrapper = useCallback(
    (params: GridCellParams<T, any, any>): string => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      let classNames = getCellClassName?.(params) ?? '';

      if (params.rowNode.type === 'group') {
        classNames += ' grouping-row-cell';
      }

      if (!params.isEditable && params.field !== 'actions') {
        classNames += ' non-editable-cell';
      }

      return classNames;
    },
    [getCellClassName],
  );

  return {
    handleRowClick,
    handleColumnResize,
    getCellClassNameWrapper,
  };
};
