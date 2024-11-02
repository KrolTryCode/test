import { FC } from 'react';

import { DataGrid } from '~/components/datagrid/datagrid.component';
import { usePermissionsTable } from '~/pages/admin/permissions/permissions-table/use-permissions-table.hook';

import { GridPermission } from '../permissions.type';

export const PermissionsTable: FC = () => {
  const {
    apiRef,
    isLoading,
    permissions,
    handleCellClick,
    permissionColumns,
    paging,
    setGridPaging,
  } = usePermissionsTable();

  return (
    <DataGrid<GridPermission>
      ref={apiRef}
      columns={permissionColumns}
      items={permissions?.items ?? []}
      totalCount={permissions?.totalCount ?? 0}
      loading={isLoading}
      onCellClick={handleCellClick}
      paging={paging}
      onPagingChanged={setGridPaging}
      hasWidthSaving={false}
    />
  );
};

export default PermissionsTable;
