import { Edit as EditIcon } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import {
  AddEntity,
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  notifySuccess,
} from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { TaskFormData } from '~/api/mocks/forms/types';
import { useDeleteFormMutation } from '~/api/tasks/forms/delete-form.mutation';
import { useGetFormsQuery } from '~/api/tasks/forms/get-forms.query';
import { addPath, editPath } from '~/utils/configuration/routes-paths';
import { showErrorMessage } from '~/utils/show-error-message';

const TaskFormsList: FC = () => {
  const { projectId = '' } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: forms = [], isLoading } = useGetFormsQuery(projectId);

  const { mutate: deleteForm } = useDeleteFormMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const columns = useMemo<EnhancedColDef<TaskFormData>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.NAME'),
        flex: 1,
      },
      {
        field: 'author',
        headerName: t('COMMON.AUTHOR'),
        flex: 1,
      },
      {
        field: 'created',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        flex: 1,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              label={t('ACTION.EDIT')}
              title={t('ACTION.EDIT')}
              icon={<EditIcon />}
              color={'primary'}
              component={Link}
              // @ts-expect-error type
              to={`${row.id}/${editPath}`}
            />,
            <DeleteCellButton key={'delete'} deleteHandler={() => deleteForm(row.id)} />,
          ];
        },
      },
    ],
    [deleteForm, t],
  );

  return (
    <DataGrid
      items={forms}
      totalCount={forms.length ?? 0}
      columns={columns}
      loading={isLoading}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={<AddEntity onClick={() => navigate(addPath)} />}
    />
  );
};

export default TaskFormsList;
