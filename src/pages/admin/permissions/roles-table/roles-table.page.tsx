import { GridEventListener, GridRowEditStopReasons, useGridApiRef } from '@mui/x-data-grid-premium';
import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangeRoleMutation } from '~/api/queries/roles/change-role.mutation';
import { useFindRolesQuery } from '~/api/queries/roles/find-roles.query';
import { useRemoveRoleMutation } from '~/api/queries/roles/remove-role.mutation';
import { Role } from '~/api/utils/api-requests';
import { EditTextarea } from '~/ui-components/datagrid/cells/multiline-editing-cell.component';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { EnhancedColDef, GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { AddEntity } from '~/ui-components/datagrid/slots/toolbar/add/add-entity.component';
import { useGetRowActions } from '~/ui-components/datagrid/use-get-grid-row-actions.hook';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

import { addRoleModal } from '../add-role/add-role.component';

export const RolesTable: FC = () => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();

  const [paging, setGridPaging] = useState<GridPagingParams>();
  const { data: roles, isLoading } = useFindRolesQuery(paging);

  const { mutateAsync: changeRoleMutation } = useChangeRoleMutation();

  const { mutate: removeRole } = useRemoveRoleMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const addRoleHandler = () => {
    addRoleModal({
      title: t('BUTTON.CREATE', {
        type: t('ENTITY.ROLE').toLowerCase(),
      }),
    });
  };

  const { getActions, onRowModesModelChange, rowModesModel } = useGetRowActions<Role>(
    apiRef,
    removeRole,
    'id',
  );

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
        width: 80,
        getActions,
      },
    ],
    [getActions, t],
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
      paging={paging}
      onPagingChanged={setGridPaging}
      hasWidthSaving={false}
      customToolbarContent={<AddEntity onClick={addRoleHandler} />}
    />
  );
};

export default RolesTable;
