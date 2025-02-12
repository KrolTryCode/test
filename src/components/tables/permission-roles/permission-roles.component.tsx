import { GridEventListener, GridRowEditStopReasons, useGridApiRef } from '@mui/x-data-grid-premium';
import {
  notifySuccess,
  EditTextarea,
  EnhancedColDef,
  GridPagingParams,
  AddEntity,
} from '@pspod/ui-components';
import { useCallback, useMemo, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangeRoleMutation } from '~/api/queries/roles/change-role.mutation';
import { useCreateRoleMutation } from '~/api/queries/roles/create-role.mutation';
import { useFindRolesQuery } from '~/api/queries/roles/find-roles.query';
import { useRemoveRoleMutation } from '~/api/queries/roles/remove-role.mutation';
import { Role } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { useGetEditRowActions } from '~/components/datagrid/use-get-edit-row-actions.hook';
import { addRoleModal } from '~/components/forms/permission-role/role-form';
import { useServerPagingParams } from '~/utils/hooks';
import { showErrorMessage } from '~/utils/show-error-message';

export const PermissionRoleTable: FC = () => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();

  const [paging, setGridPaging] = useState<GridPagingParams>();
  const serverPagingParams = useServerPagingParams(paging);
  const { data: roles, isLoading } = useFindRolesQuery(serverPagingParams);

  const { mutateAsync: changeRoleMutation } = useChangeRoleMutation();

  const { mutate: removeRole } = useRemoveRoleMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const createRoleMutation = useCreateRoleMutation({
    onSuccess: () => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const addRoleHandler = () => {
    addRoleModal({
      onSave: createRoleMutation.mutate,
      title: t('ACTION.CREATE', {
        type: t('ENTITY.ROLE').toLowerCase(),
      }),
    });
  };

  const { getActions, onRowModesModelChange, rowModesModel } = useGetEditRowActions<Role>({
    apiRef,
    protectedKey: 'protectedPermissions',
  });

  const changeRole = useCallback(
    async ({ title, description, id, permissions }: Role, oldRow: Role): Promise<Role> => {
      const isStringValuesChanged = title !== oldRow.title || description !== oldRow.description;
      if (!isStringValuesChanged) {
        return oldRow;
      }

      try {
        const result = await changeRoleMutation({
          id: id!,
          title,
          description,
        });
        notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
        return { ...result, permissions };
      } catch (e) {
        showErrorMessage(e, 'ERROR.UPDATE_FAILED');
        return oldRow;
      }
    },
    [changeRoleMutation, t],
  );

  const columns = useMemo<EnhancedColDef<Role>[]>(
    () => [
      {
        field: 'title',
        headerName: t('COMMON.TITLE'),
        flex: 1,
        editable: true,
        maxWidth: 420,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 1,
        editable: true,
        cellClassName: 'multiline',
        renderEditCell: params => <EditTextarea {...params} />,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 82,
        getActions: getActions(removeRole),
      },
    ],
    [getActions, removeRole, t],
  );

  const onRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <DataGrid<Role>
      ref={apiRef}
      loading={isLoading}
      items={roles?.content ?? []}
      totalCount={roles?.totalElements ?? 0}
      editMode={'row'}
      columns={columns}
      processRowUpdate={changeRole}
      rowModesModel={rowModesModel}
      onRowModesModelChange={onRowModesModelChange}
      onRowEditStop={onRowEditStop}
      pagingMode={'server'}
      paging={paging}
      onPagingChanged={setGridPaging}
      hasWidthSaving={false}
      customToolbarContent={<AddEntity onClick={addRoleHandler} />}
    />
  );
};
