import { DeleteOutline } from '@mui/icons-material';
import { Box, Dialog } from '@mui/material';
import type { GridFilterPanelProps } from '@mui/x-data-grid/components/panel/filterPanel/GridFilterPanel';
import {
  GridColDef,
  gridColumnGroupingSelector,
  GridFilterPanel,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-premium';
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/ui-components/button/button.component';
import { serviceRowGroupPrefix } from '~/ui-components/datagrid/datagrid.utils';

export const FilterPanel: FC<GridFilterPanelProps> = props => {
  const { t } = useTranslation();
  const gridContext = useGridApiContext();
  const { lookup: groupLookup } = useGridSelector(gridContext, gridColumnGroupingSelector);
  const { current: apiRef } = gridContext;
  const [isOpen, setIsIsOpen] = useState(true);
  const [isRefactored, setIsRefactored] = useState(false);
  const originalColumns = useMemo(
    () => apiRef.getAllColumns().filter(col => !col.field.startsWith(serviceRowGroupPrefix)),
    [apiRef],
  );

  const updateColumns = useCallback(
    (columns: GridColDef[]) => apiRef.updateColumns(columns),
    [apiRef],
  );

  const concatGroupPrefixToColumns = useCallback(() => {
    const refactoredCols = originalColumns.map(col => {
      const groupPathNames = apiRef.getColumnGroupPath(col.field);
      const groupNames = groupPathNames.map(gr => groupLookup[gr].headerName);

      const combinedName =
        groupNames.length !== 0 ? `${groupNames.join(': ')}: ${col.headerName}` : col.headerName;
      return { ...col, headerName: combinedName };
    });
    updateColumns(refactoredCols);
  }, [apiRef, groupLookup, originalColumns, updateColumns]);

  const disableFilterForGroupedColumns = useCallback(() => {
    apiRef.setState(prevState => {
      const newColumnsLookup = { ...prevState.columns.lookup };
      Object.keys(newColumnsLookup).forEach(key => {
        if (key.startsWith(serviceRowGroupPrefix)) {
          newColumnsLookup[key].filterable = false;
        }
      });
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          lookup: newColumnsLookup,
        },
      };
    });
  }, [apiRef]);

  useLayoutEffect(() => {
    if (!isRefactored) {
      concatGroupPrefixToColumns();
      disableFilterForGroupedColumns();
      setIsRefactored(true);
    }
  }, [isRefactored, concatGroupPrefixToColumns, disableFilterForGroupedColumns]);

  useEffect(() => {
    if (!isOpen) {
      updateColumns(originalColumns);
    }
  }, [isOpen, originalColumns, updateColumns]);

  const handleClose = () => {
    apiRef.hideFilterPanel();
    setIsIsOpen(false);
  };

  const handleClearFilterModel = useCallback(() => apiRef.setFilterModel({ items: [] }), [apiRef]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={'md'}
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <Box padding={1}>
        <GridFilterPanel {...props} sx={{ width: '101%' }} />
        <Box padding={1} right={8} bottom={4} position={'absolute'}>
          <Button
            color={'primary'}
            variant={'text'}
            onClick={handleClearFilterModel}
            icon={<DeleteOutline />}
          >
            {t(`ACTION.CLEAR_FILTERS`)}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
