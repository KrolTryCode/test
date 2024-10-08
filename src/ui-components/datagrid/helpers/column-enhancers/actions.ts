import { GridActionsColDef } from '@mui/x-data-grid-premium';

import { ColumnEnhancer } from '~/ui-components/datagrid/datagrid.types';

export const enhanceActionsColDef: ColumnEnhancer = (colDef, passedColDef) => {
  if (!passedColDef.useCustomHideConditions) {
    (colDef as GridActionsColDef).getActions = params => {
      if (params.row.id === undefined) {
        return [];
      }
      return (passedColDef as GridActionsColDef).getActions(params);
    };
  }

  colDef.minWidth = 50; // 1 icon in row
  colDef.maxWidth = 84; // 2 icons in row
  colDef.resizable = false;
  colDef.hideable = false;
};
