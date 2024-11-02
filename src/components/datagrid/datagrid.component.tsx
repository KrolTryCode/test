import { GridValidRowModel } from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { DataGrid as Grid, DataGridProps } from '@pspod/ui-components';
import { ForwardedRef, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { enterNameModal } from '~/components/modals-content/enter-name-modal.component';

const PREFIX = 'indanisTable_';

const DataGridIndanis = forwardRef(function DataGrid<T extends GridValidRowModel = any>(
  props: DataGridProps<T>,
  parentRef: ForwardedRef<GridApiPremium | null>,
) {
  const { t } = useTranslation();
  return (
    <Grid<T>
      storagePrefix={PREFIX}
      {...props}
      ref={parentRef}
      onEnterFileNameInput={() =>
        new Promise(resolve => {
          enterNameModal({
            title: t('COMMON.ENTER_FILENAME'),
            onOk: fileName => resolve(fileName),
          });
        })
      }
    />
  );
});

export { DataGridIndanis as DataGrid };
