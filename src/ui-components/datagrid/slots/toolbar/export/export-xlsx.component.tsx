import { MenuItem } from '@mui/material';
import {
  GridExcelExportOptions,
  GridExportMenuItemProps,
  useGridApiContext,
} from '@mui/x-data-grid-premium';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { enterNameModal } from '~/components/modals-content/enter-name-modal.component';

type GridExcelExportMenuItemProps = GridExportMenuItemProps<GridExcelExportOptions>;

export const GridExcelExportMenuItem: FC<GridExcelExportMenuItemProps> = ({
  hideMenu,
  options,
}) => {
  const { t } = useTranslation();
  const gridApi = useGridApiContext();

  const handleExportExcelClick = () => {
    enterNameModal({
      title: `${t('EXPORT.EXPORT_TO')} ${t('EXPORT.XLSX')}`,
      onOk: async fileName => {
        await gridApi.current.exportDataAsExcel({
          ...options,
          fileName,
        });
      },
    });

    hideMenu?.();
  };

  return <MenuItem onClick={handleExportExcelClick}>{t('EXPORT.XLSX')}</MenuItem>;
};
