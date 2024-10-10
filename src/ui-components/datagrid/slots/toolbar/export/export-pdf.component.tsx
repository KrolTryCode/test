import { MenuItem } from '@mui/material';
import {
  GridExcelExportOptions,
  GridExportMenuItemProps,
  useGridApiContext,
} from '@mui/x-data-grid-premium';
import { format, isDate } from 'date-fns';
import { CellModel, Workbook } from 'exceljs';
import jsPDF, { jsPDFOptions } from 'jspdf';
import autoTable, { CellDef } from 'jspdf-autotable';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { font } from '~/assets/fonts/IBMSansMedium';
import { enterNameModal } from '~/components/modals-content/enter-name-modal.component';

type GridPdfExportMenuItemProps = GridExportMenuItemProps<jsPDFOptions & GridExcelExportOptions>;

export const GridPdfExportMenuItem: FC<GridPdfExportMenuItemProps> = ({ hideMenu, options }) => {
  const { t } = useTranslation();
  const gridApi = useGridApiContext();

  const handleExportPdfClick = () => {
    enterNameModal({
      title: `${t('EXPORT.EXPORT_TO')} ${t('EXPORT.PDF')}`,
      onOk: async fileName => {
        const xlsData = await gridApi.current.getDataAsExcel(options ?? {});
        if (xlsData) {
          const doc = xlsToPdf(xlsData, options);
          const matchesPdf = /\.pdf$/.test(fileName);
          doc.save(matchesPdf ? fileName : `${fileName}.pdf`);
        }
      },
    });
    hideMenu?.();
  };

  return <MenuItem onClick={handleExportPdfClick}>{t('EXPORT.PDF')}</MenuItem>;
};

function xlsToPdf(data: Workbook, options: jsPDFOptions = {}) {
  const FONT_NAME = 'IBMSans';
  const doc = new jsPDF({ orientation: 'l', format: 'a4', ...options });

  doc.addFileToVFS('IBMSansMedium.ttf', font);
  doc.addFont('IBMSansMedium.ttf', FONT_NAME, 'normal');
  doc.addFont('IBMSansMedium.ttf', FONT_NAME, 'bold');
  doc.setFont(FONT_NAME);

  const worksheet = data.getWorksheet();

  if (!worksheet) {
    return doc;
  }

  const rows = worksheet.getRows(2, worksheet.rowCount - 1) ?? [];
  const hiddenColsNumbers = worksheet.columns.filter(col => col.hidden).map(col => col.number);

  // 1-based index, so getting rid of first empty element
  const [_empty, ...header] = worksheet.getRow(1).values as string[];
  const filteredHeader = header.filter((_, i) => !hiddenColsNumbers.includes(i + 1));

  const body = rows.map(row => {
    const cellDefs: CellDef[] = [];

    for (let i = 1; i <= row.cellCount; i++) {
      const cell = row.getCell(i);
      if (!hiddenColsNumbers.includes(+cell.col)) {
        cellDefs.push(getCellDef(cell.model));
      }
    }

    return cellDefs;
  });

  autoTable(doc, {
    head: [filteredHeader],
    body,
    styles: {
      font: FONT_NAME,
      valign: 'middle',
    },
    headStyles: {
      fillColor: 'white',
      textColor: 'gray',
    },
  });

  return doc;
}

function getCellDef({ style, value }: CellModel): CellDef {
  const { fill, numFmt } = style;
  const fillColor = fill?.type === 'pattern' ? fill.fgColor?.argb : undefined;
  let val = value as string | number;

  if (isDate(val)) {
    val = numFmt ? format(val, numFmt) : new Date(val).toLocaleString();
  }

  return {
    content: val ?? '',
    styles: fillColor ? { fillColor: `#${fillColor}` } : undefined,
  };
}
