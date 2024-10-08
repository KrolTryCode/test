import {
  DataGridPremium as MuiDataGrid,
  DataGridPremiumProps,
  GridValidRowModel,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { ForwardedRef, forwardRef, useImperativeHandle, useMemo } from 'react';

import { modifyColumnGroupingModel } from '~/ui-components/datagrid/datagrid.utils';
import { useFlatRows } from '~/ui-components/datagrid/helpers/use-flat-rows.hook';
import { ColumnsPanel } from '~/ui-components/datagrid/slots/toolbar/columns-panel/columns-panel.component';
import { FilterPanel } from '~/ui-components/datagrid/slots/toolbar/filter-panel/filter-panel.component';
import { useGridCallbacks } from '~/ui-components/datagrid/use-grid-callbacks.hook';

import { gridCustomDefaultProps } from './datagrid.consts';
import { DataGridProps } from './datagrid.types';
import { GridFullscreen } from './grid-fullscreen/grid-fullscreen.component';
import { useEnhancedColumns } from './helpers/column-enhancers/use-enhanced-columns.hook';
import { usePaging } from './helpers/use-paging.hook';
import { useSyncGridState } from './helpers/use-sync-grid-state.hook';
import { GridFooter } from './slots/footer/_footer.component';
import { GridToolbar } from './slots/toolbar/_toolbar.component';

export const DataGrid = forwardRef(function DataGrid<T extends GridValidRowModel = any>(
  {
    items,
    pdfExportOptions: printExportOptions,
    excelExportOptions,
    hasExport = false,
    hasColumnChooser = true,
    hasWidthSaving = true,
    hasFullscreenMode = true,
    fontSizeSettingsPlacement = 'footer',
    hasToolbarFilters = true,
    gridId,
    columns: passedColumns,
    customToolbarContent,
    importToolbarContent,
    columnGroupingModel,
    ...passedProps
  }: DataGridProps<T>,
  parentRef: ForwardedRef<GridApiPremium>,
) {
  const apiRef = useGridApiRef();

  useImperativeHandle(parentRef, () => apiRef.current);

  // saveColumnsVisibilityModel: hasColumnChooser, т.к. при отсутствии выбора колонок, колонку не вернуть!
  useSyncGridState(apiRef, {
    gridId,
    saveColumnsVisibilityModel: hasColumnChooser,
    initialState: passedProps.initialState,
  });

  const pagingProps = usePaging(passedProps);
  const columns = useEnhancedColumns<T>({
    columns: passedColumns,
    hasWidthSaving,
    gridId,
    pagingMode: pagingProps.paginationMode,
  });
  const rows = useFlatRows(items as Record<string, unknown>[]) as T[];

  // Необходимо для скрытия сгруппированных столбцов
  useKeepGroupedColumnsHidden({ apiRef });

  const { handleRowClick, handleColumnResize, getCellClassNameWrapper } = useGridCallbacks({
    ...passedProps,
    apiRef,
  });

  const modifiedColumnGroupingModel = useMemo(
    () => modifyColumnGroupingModel(columnGroupingModel),
    [columnGroupingModel],
  );

  const slotProps = useMemo<DataGridPremiumProps<T>['slotProps']>(() => {
    return {
      ...passedProps.slotProps,
      columnsPanel: { columnGroupingModel },
      toolbar: {
        hasExport,
        hasColumnChooser,
        excelExportOptions,
        hasFullscreenMode,
        customContent: customToolbarContent,
        importToolbarContent: importToolbarContent,
        pdfExportOptions: printExportOptions,
        hasFilters: hasToolbarFilters,
        hasFontSizeSettings: fontSizeSettingsPlacement === 'toolbar',
        gridId,
      },
      footer: {
        gridId,
        hasFontSizeSettings: fontSizeSettingsPlacement === 'footer',
      },
      columnMenu: {
        slots: {
          ...(hasToolbarFilters && { columnMenuFilterItem: null }),
          ...(hasColumnChooser && { columnMenuColumnsItem: null }),
        },
      },
      ...(hasToolbarFilters && {
        filterPanel: {
          ...passedProps.slotProps?.filterPanel,
          disableRemoveAllButton: true,
        },
      }),
    };
  }, [
    passedProps.slotProps,
    columnGroupingModel,
    hasExport,
    hasColumnChooser,
    excelExportOptions,
    hasFullscreenMode,
    customToolbarContent,
    importToolbarContent,
    printExportOptions,
    hasToolbarFilters,
    fontSizeSettingsPlacement,
    gridId,
  ]);

  const slots = useMemo(() => {
    const isToolbarShown =
      hasExport ||
      hasColumnChooser ||
      hasToolbarFilters ||
      !!importToolbarContent ||
      !!customToolbarContent ||
      fontSizeSettingsPlacement === 'toolbar';
    return {
      filterPanel: FilterPanel,
      footer: GridFooter,
      toolbar: isToolbarShown ? GridToolbar : null,
      columnsPanel: ColumnsPanel,
      ...passedProps.slots,
    };
  }, [
    passedProps.slots,
    customToolbarContent,
    fontSizeSettingsPlacement,
    hasColumnChooser,
    hasExport,
    hasToolbarFilters,
    importToolbarContent,
  ]);

  return (
    <GridFullscreen hasFullscreenMode={hasFullscreenMode}>
      <MuiDataGrid<T>
        {...gridCustomDefaultProps}
        {...passedProps}
        slots={slots}
        slotProps={slotProps}
        rows={rows}
        columns={columns}
        onColumnResize={handleColumnResize}
        onRowClick={handleRowClick}
        apiRef={apiRef}
        getCellClassName={getCellClassNameWrapper}
        columnGroupingModel={modifiedColumnGroupingModel}
        {...pagingProps}
      />
    </GridFullscreen>
  );
});
