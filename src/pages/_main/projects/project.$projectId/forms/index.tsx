import { Edit as EditIcon } from '@mui/icons-material';
import {
  AddEntity,
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  notifySuccess,
} from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useArchiveFormMutation } from '~/api/queries/forms/archive-form.mutation';
import { useGetFormsQuery } from '~/api/queries/forms/get-forms.query';
import { ParameterForm } from '~/api/utils/api-requests';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/')({
  component: TaskFormList,
});

function TaskFormList() {
  const { projectId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: forms = [], isLoading } = useGetFormsQuery(projectId);

  const { mutate: deleteForm } = useArchiveFormMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const columns = useMemo<EnhancedColDef<ParameterForm>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.NAME'),
        flex: 1,
      },
      // {
      //   field: 'author',
      //   headerName: t('COMMON.AUTHOR'),
      //   flex: 1,
      // },
      // {
      //   field: 'created',
      //   type: 'dateTime',
      //   headerName: t('COMMON.DATE_CREATED'),
      //   flex: 1,
      // },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItemLink
              key={'edit'}
              label={t('ACTION.EDIT')}
              title={t('ACTION.EDIT')}
              icon={<EditIcon />}
              color={'primary'}
              to={`${row.id}/edit`}
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
      customToolbarContent={
        <AddEntity
          onClick={() =>
            void navigate({
              to: '/projects/project/$projectId/forms/add',
              params: { projectId },
            })
          }
        />
      }
    />
  );
}
