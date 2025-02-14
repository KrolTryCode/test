import { Edit as EditIcon } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { GridActionsCellItem, GridEventListener } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DataType, ParameterField } from '~/api/utils/api-requests';
import { useParametersHook } from '~/components/tables/form-parameter-fields/parameters-fields.hook';
import { useCustomTranslations } from '~/utils/hooks';

interface ParametersTableProps {
  formId: string;
}

export const ParametersTable: FC<ParametersTableProps> = ({ formId }) => {
  const { t } = useTranslation();
  const { translateColumnType } = useCustomTranslations();

  const {
    parameters,
    isLoading,
    deleteParameter,
    handleCreateParameter,
    handleUpdateParameter,
    changeOrder,
  } = useParametersHook(formId);

  const handleOrderChange = useCallback<GridEventListener<'rowOrderChange'>>(
    props => void changeOrder(props),
    [changeOrder],
  );

  const columns = useMemo<EnhancedColDef<ParameterField>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        flex: 1,
      },
      {
        field: 'type',
        headerName: t('COMMON.TYPE'),
        flex: 1,
        valueGetter: (value: DataType) => translateColumnType(value),
      },
      { field: 'isRequired', headerName: t('ERROR.REQUIRED'), flex: 1, type: 'boolean' },
      { field: 'defaultValue', headerName: t('COMMON.DEFAULT_VALUE'), flex: 1 },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT', { type: t('ENTITY.FORM').toLowerCase() })}
              title={t('ACTION.EDIT', { type: t('ENTITY.FORM').toLowerCase() })}
              icon={<EditIcon />}
              color={'primary'}
              onClick={() => handleUpdateParameter(row)}
            />,
            <DeleteCellButton
              key={'delete'}
              disabled={row.isDefault}
              deleteHandler={() => deleteParameter(row.id)}
            />,
          ];
        },
      },
    ],
    [deleteParameter, handleUpdateParameter, t, translateColumnType],
  );
  return (
    <Stack minHeight={'40vh'}>
      <Typography variant={'h4'}>{t('ENTITY.PARAMETERS')}</Typography>
      <DataGrid
        rowReordering
        onRowOrderChange={handleOrderChange}
        items={parameters}
        totalCount={parameters?.length}
        columns={columns}
        loading={isLoading}
        customToolbarContent={<AddEntity onClick={handleCreateParameter} />}
      />
    </Stack>
  );
};
