import { Box } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarFilterButtonProps,
  useGridApiContext,
  ColumnsStylesInterface,
  GridSlotProps,
} from '@mui/x-data-grid-premium';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ImportContainer } from '~/ui-components/datagrid/slots/toolbar/import/import-container.component';
import { FullscreenButton } from '~/ui-components/fullscreen-button/fullscreen-button.component';
import { availableDateFormats, availableDateTimeFormats } from '~/utils/date/time-format';

import { FontSizeSettings } from '../_font-size-settings/font-size-settings.component';

import { GridPdfExportMenuItem } from './export/export-pdf.component';
import { GridExcelExportMenuItem } from './export/export-xlsx.component';

const commonSlotProps: GridToolbarFilterButtonProps['slotProps'] = {
  button: { size: 'medium' },
};

export const GridToolbar: FC<GridSlotProps['toolbar']> = ({
  pdfExportOptions,
  excelExportOptions,
  hasColumnChooser,
  hasExport,
  hasFilters,
  customContent,
  importToolbarContent,
  hasFontSizeSettings,
  gridId,
  hasFullscreenMode,
  ...props
}) => {
  const { i18n } = useTranslation();
  const gridRef = useGridApiContext();
  const columns = gridRef.current.getAllColumns();

  const columnsStyles = useMemo(() => {
    const otherStyles = excelExportOptions?.columnsStyles ?? {};

    const dateCols = columns.filter(col => ['date', 'dateTime'].includes(col.type ?? ''));

    const dateStyles = dateCols.reduce<ColumnsStylesInterface>((styles, col) => {
      const numFmtConfig = col.type === 'date' ? availableDateFormats : availableDateTimeFormats;
      const colStyle = {
        numFmt: numFmtConfig[i18n.language],
        ...otherStyles[col.field],
      };
      return { ...styles, [col.field]: colStyle };
    }, {});

    return { ...otherStyles, ...dateStyles };
  }, [columns, i18n.language, excelExportOptions?.columnsStyles]);

  return (
    <GridToolbarContainer {...props}>
      {hasFilters && <GridToolbarFilterButton slotProps={commonSlotProps} />}
      {hasColumnChooser && <GridToolbarColumnsButton slotProps={commonSlotProps} />}
      {hasFontSizeSettings && <FontSizeSettings gridId={gridId} />}

      {hasExport && (
        <GridToolbarExportContainer slotProps={commonSlotProps}>
          <GridExcelExportMenuItem options={{ ...excelExportOptions, columnsStyles }} />
          <GridPdfExportMenuItem
            options={{ ...excelExportOptions, ...pdfExportOptions, columnsStyles }}
          />
        </GridToolbarExportContainer>
      )}
      {importToolbarContent && <ImportContainer importToolbarContent={importToolbarContent} />}

      {customContent}

      <Box hidden={!hasFullscreenMode} marginLeft={'auto'}>
        <FullscreenButton size={'small'} element={document.body} />
      </Box>
    </GridToolbarContainer>
  );
};
