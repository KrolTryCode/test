import { Edit as EditIcon } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import {
  AddEntity,
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  modal,
  notifySuccess,
} from '@pspod/ui-components';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FormParameter } from '~/api/mocks/forms/parameters/types';
import { useCreateFormParameterMutation } from '~/api/tasks/forms/parameters/create-form-parameter.mutation';
import { useDeleteFormParameterMutation } from '~/api/tasks/forms/parameters/delete-form-parameter.mutation';
import { useUpdateFormParameterMutation } from '~/api/tasks/forms/parameters/update-form-parameter.mutation';
import { ParameterForm } from '~/pages/projects/project/tasks/forms/parameters/parameter-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

interface ParametersTableProps {
  formId: string;
  parameters?: FormParameter[];
}

export const ParametersTable: FC<ParametersTableProps> = ({ formId, parameters = [] }) => {
  const { t } = useTranslation();

  const { mutate: deleteParameter } = useDeleteFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.DELETION_FAILED')),
  });
  const { mutate: createParameter } = useCreateFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.CREATION_FAILED')),
  });
  const { mutate: updateParameter } = useUpdateFormParameterMutation(formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.UPDATE_FAILED')),
  });

  const handleCreateParameter = useCallback(() => {
    modal({
      onOk: createParameter,
      title: t('ACTION.ADD', { type: t('ENTITY.PARAMETER').toLowerCase() }),
      renderContent: args => <ParameterForm {...args} />,
    });
  }, [createParameter, t]);

  const handleUpdateParameter = useCallback(
    (row: FormParameter) => {
      modal({
        onOk: updateParameter,
        title: t('ACTION.EDIT', { type: t('ENTITY.SOLVER').toLowerCase() }),
        renderContent: args => <ParameterForm {...args} data={row} />,
      });
    },
    [t, updateParameter],
  );

  const columns = useMemo<EnhancedColDef<FormParameter>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.NAME'),
        flex: 1,
      },
      { field: 'type', headerName: t('COMMON.TYPE'), flex: 1 },
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
            <DeleteCellButton key={'delete'} deleteHandler={() => deleteParameter(row.id)} />,
          ];
        },
      },
    ],
    [deleteParameter, handleUpdateParameter, t],
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
