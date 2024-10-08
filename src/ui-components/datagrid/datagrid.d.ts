// https://mui.com/x/react-data-grid/components/#custom-slot-props-with-typescript
// node_modules\@mui\x-data-grid\models\gridSlotsComponentsProps.d.ts

import { GridColumnGroupingModel, GridExcelExportOptions } from '@mui/x-data-grid-premium';
import { jsPDFOptions } from 'jspdf';
import { ReactNode } from 'react';

declare module '@mui/x-data-grid-premium' {
  interface FooterPropsOverrides {
    gridId?: string;
    hasFontSizeSettings?: boolean;
  }

  interface ToolbarPropsOverrides {
    pdfExportOptions?: jsPDFOptions;
    excelExportOptions?: GridExcelExportOptions;
    hasColumnChooser?: boolean;
    hasExport?: boolean;
    customContent?: ReactNode;
    importToolbarContent?: ReactNode;
    hasFilters?: boolean;
    hasFullscreenMode?: boolean;
    hasFontSizeSettings?: boolean;
    gridId?: string;
  }

  interface ColumnsPanelPropsOverrides {
    columnGroupingModel?: GridColumnGroupingModel;
  }
}
