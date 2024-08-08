import type {
  GridColDef,
  GridExcelExportOptions,
  GridFilterModel,
  GridPaginationModel,
  GridRowGroupingModel,
  GridSortModel,
  GridValidRowModel,
  DataGridPremiumProps as MuiDataGridProps,
} from '@mui/x-data-grid-premium';
import { jsPDFOptions } from 'jspdf';
import { ReactNode } from 'react';

export interface DataGridProps<T extends GridValidRowModel = any>
  extends Omit<
    MuiDataGridProps<T>,
    'apiRef' | 'rows' | 'rowCount' | 'filterModel' | 'paginationModel' | 'sortModel'
  > {
  columns: EnhancedColDef<T>[];
  items: MuiDataGridProps['rows'];
  totalCount: MuiDataGridProps['rowCount'];
  pagingMode?: 'server' | 'client';
  hasExport?: boolean;
  hasColumnChooser?: boolean;
  hasWidthSaving?: boolean;
  fontSizeSettingsPlacement?: 'footer' | 'toolbar' | 'hidden';
  hasToolbarFilters?: boolean;
  pdfExportOptions?: jsPDFOptions;
  excelExportOptions?: GridExcelExportOptions;
  customToolbarContent?: ReactNode;
  /** Menu contents, normally `MenuItem`s */
  importToolbarContent?: ReactNode[];
  paging?: GridPagingParams;
  onPagingChanged?: (options: GridPagingParams) => void;
  gridId?: string;
}

export type EnhancedColDef<T extends GridValidRowModel = any> = GridColDef<T> & {
  /**
   * native datetime format options applied for date/datetime columns
   */
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;

  /**
   * for action cell substitutes empty actions array if no row id (e.g. grouping row)
   */
  useCustomHideConditions?: boolean;
};

export type ColumnEnhancer<T extends GridValidRowModel = any> = (
  colDef: EnhancedColDef<T>,
  passedColDef: EnhancedColDef<T>,
) => void;

export interface GridPagingParams {
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filterModel?: GridFilterModel;
  groupingModel?: GridRowGroupingModel;
}
