import { Edit as EditIcon } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef, modal } from '@pspod/ui-components';
import { DataType } from 'devextreme/common';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetFormParametersQuery } from '~/api/queries/forms/parameters/get-parameters.query';
import { sortParametersByIndex } from '~/api/selectors/sort-parameters-by-index';
import { ParameterField } from '~/api/utils/api-requests';
import { ParameterForm } from '~/components/forms/parameter-field/parameter-field-form';
import { useParameterFieldsActions } from '~/pages/_main/projects/project.$projectId/forms/use-parameter-fileds-actions.hook';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

interface ParametersTableProps {
  formId: string;
}

export const ParametersTable: FC<ParametersTableProps> = ({ formId }) => {
  const { t } = useTranslation();
  const { translateColumnType } = useCustomTranslations();
  const { data: parameters = [] } = useGetFormParametersQuery(formId, {
    select: sortParametersByIndex,
  });

  const { deleteParameter, createParameter, updateParameter } = useParameterFieldsActions(formId);

  const handleCreateParameter = useCallback(() => {
    modal({
      onOk: createParameter,
      title: t('ACTION.ADD', { type: t('ENTITY.PARAMETER').toLowerCase() }),
      renderContent: args => <ParameterForm {...args} />,
    });
  }, [createParameter, t]);

  const handleUpdateParameter = useCallback(
    (row: ParameterField) => {
      modal({
        onOk: updateParameter,
        title: t('ACTION.EDIT', { type: t('ENTITY.PARAMETER').toLowerCase() }),
        renderContent: args => <ParameterForm {...args} data={row} />,
      });
    },
    [t, updateParameter],
  );

  const columns = useMemo<EnhancedColDef<ParameterField>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.NAME'),
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
        items={parameters}
        totalCount={parameters?.length}
        columns={columns}
        customToolbarContent={<AddEntity onClick={handleCreateParameter} />}
      />
    </Stack>
  );
};
