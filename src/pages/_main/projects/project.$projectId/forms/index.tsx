import { Edit as EditIcon } from '@mui/icons-material';
import {
  AddEntity,
  DataGrid,
  DeleteCellButton,
  EnhancedColDef,
  modal,
  notifySuccess,
} from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useAddFormMutation } from '~/api/queries/forms/add-form.mutation';
import { useArchiveFormMutation } from '~/api/queries/forms/archive-form.mutation';
import { getFormsQueryOptions } from '~/api/queries/forms/get-forms.query';
import { CreateProjectParameterFormRequest, ParameterForm } from '~/api/utils/api-requests';
import { AddTaskForm } from '~/components/forms/task-form/add-task-form';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/')({
  component: TaskFormList,
  loader: async ({ context: { queryClient }, params: { projectId } }) => {
    const forms = await queryClient.fetchQuery(getFormsQueryOptions(projectId));
    return { forms };
  },
});

function TaskFormList() {
  const { projectId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { forms } = Route.useLoaderData();
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  const { mutate: deleteForm } = useArchiveFormMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const { mutateAsync: addForm, isPending } = useAddFormMutation(projectId, {
    onSuccess: res => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      void navigate({
        to: '/projects/project/$projectId/forms/$formId/edit',
        params: { projectId, formId: res.id },
      });
    },
    onError: e => {
      showErrorMessage(e, t('ERROR.CREATION_FAILED'));
    },
  });

  const columns = useMemo<EnhancedColDef<ParameterForm>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
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
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={
        <AddEntity
          onClick={() =>
            modal({
              title: t('ACTION.ADD', {
                type: declinatedForm,
              }),
              onOk: addForm,
              renderContent: (
                modalInstance: InstanceProps<CreateProjectParameterFormRequest, never>,
              ) => <AddTaskForm {...modalInstance} isPending={isPending} />,
            })
          }
        />
      }
    />
  );
}
