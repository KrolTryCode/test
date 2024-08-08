import { Checkbox } from '@mui/material';
import {
  GridCellModes,
  GridEventListener,
  GridRenderCellParams,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddRolePermissionsMutation } from '~/api/queries/roles/add-role-permissions.mutation';
import { useFindPermissionsQuery } from '~/api/queries/roles/find-permissions.query';
import { useGetAllRolesQuery } from '~/api/queries/roles/get-all-roles.query';
import { useRemoveRolePermissionsMutation } from '~/api/queries/roles/remove-role-permissions.mutation';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { EnhancedColDef, GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

import { GridPermission } from '../permissions.type';

export const PermissionsTable: FC = () => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation();

  const [paging, setGridPaging] = useState<GridPagingParams>();

  const { data: roles = [], isLoading: isRoleListLoading } = useGetAllRolesQuery();
  const { data: permissions, isLoading: isPermissionListLoading } = useFindPermissionsQuery(
    paging,
    {
      enabled: !!roles,
      select: data => {
        const gridItems: GridPermission[] | undefined = data.content?.map(permission => ({
          ...permission,
          roles: roles.map(role => {
            const newRole = {
              ...role,
              isEnabled: !!role.permissions?.some(({ id }) => id === permission.id!),
            };
            delete newRole.permissions;
            return newRole;
          }),
        }));

        return { items: gridItems ?? [], totalCount: data.totalElements ?? 0 };
      },
    },
  );

  const { mutate: addPermissions } = useAddRolePermissionsMutation();
  const { mutate: removePermissions } = useRemoveRolePermissionsMutation();

  const rolesColumns = useMemo(
    () =>
      roles.map<EnhancedColDef<GridPermission>>((r, index) => ({
        field: r.title!,
        headerName: r.title,
        description: r.description,
        editable: true,
        type: 'boolean',
        headerAlign: 'left',
        minWidth: 150,
        valueGetter: (_value, row) => row.roles?.[index].isEnabled,
        renderEditCell: ({ value, field, row }: GridRenderCellParams<GridPermission, boolean>) => {
          const role = row.roles[index];

          const toggleCheck = async (event: ChangeEvent<HTMLInputElement>) => {
            const isEnabled = event.target.checked;
            await apiRef.current.setEditCellValue({
              value: isEnabled,
              field,
              id: row.id!,
            });

            const mutation = isEnabled ? addPermissions : removePermissions;
            mutation(
              { roleId: role.id!, id: [row.id!] },
              {
                onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
                onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
              },
            );
          };

          return <Checkbox size={'small'} checked={value} onChange={toggleCheck} />;
        },
      })),
    [addPermissions, apiRef, removePermissions, roles, t],
  );

  const permissionColumns: EnhancedColDef<GridPermission>[] = useMemo(
    () => [
      {
        field: 'objectType',
        headerName: t('COMMON.TYPE'),
        width: 120,
        editable: false,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        flex: 1,
        minWidth: 200,
        editable: false,
      },
      ...rolesColumns,
    ],
    [rolesColumns, t],
  );

  const handleCellClick: GridEventListener<'cellClick'> = ({ id, field }) => {
    const cellMode = apiRef.current.getCellMode(id, field);
    if (cellMode === GridCellModes.View) {
      apiRef.current.startCellEditMode({ id, field });
    }
  };

  return (
    <DataGrid<GridPermission>
      ref={apiRef}
      columns={permissionColumns}
      items={permissions?.items ?? []}
      totalCount={permissions?.totalCount ?? 0}
      loading={isPermissionListLoading || isRoleListLoading}
      onCellClick={handleCellClick}
      paging={paging}
      onPagingChanged={setGridPaging}
      hasWidthSaving={false}
    />
  );
};

export default PermissionsTable;
