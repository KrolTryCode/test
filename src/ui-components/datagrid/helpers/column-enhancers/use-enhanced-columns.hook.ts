import { GridColDef, GridFeatureMode, GridValidRowModel } from '@mui/x-data-grid-premium';
import { useMemo } from 'react';

import { enhanceActionsColDef } from '~/ui-components/datagrid/helpers/column-enhancers/actions';
import { enhanceDateTimeColDef } from '~/ui-components/datagrid/helpers/column-enhancers/date-time';
import { enhanceNumberColDef } from '~/ui-components/datagrid/helpers/column-enhancers/number';
import { enhanceStringColDef } from '~/ui-components/datagrid/helpers/column-enhancers/string';

import { ColumnEnhancer, EnhancedColDef } from '../../datagrid.types';
import { enhanceColDefWidth, getStoredWidths } from '../columns-width';

interface Props<T extends GridValidRowModel> {
  columns: EnhancedColDef<T>[];
  hasWidthSaving: boolean;
  gridId?: string;
  pagingMode?: GridFeatureMode;
}

export function useEnhancedColumns<T extends GridValidRowModel = any>({
  columns,
  hasWidthSaving,
  pagingMode,
  gridId = '',
}: Props<T>): GridColDef<T>[] {
  return useMemo<EnhancedColDef<T>[]>(() => {
    const widths = getStoredWidths(gridId);

    return columns.map(passedColDef => {
      const colDef: EnhancedColDef = { ...passedColDef, pinnable: false };
      const colType = passedColDef.type ?? 'string';

      let enhancer: ColumnEnhancer | undefined = undefined;
      switch (colType) {
        case 'date':
        case 'dateTime':
          enhancer = enhanceDateTimeColDef;
          break;
        case 'number':
          enhancer = enhanceNumberColDef;
          break;
        case 'actions':
          enhancer = enhanceActionsColDef;
          break;
        case 'string':
          enhancer = enhanceStringColDef;
          break;
        default:
          break;
      }

      enhancer?.(colDef, passedColDef, pagingMode);

      if (hasWidthSaving && widths) {
        enhanceColDefWidth(colDef, widths);
      }

      return colDef;
    });
  }, [gridId, columns, pagingMode, hasWidthSaving]);
}
