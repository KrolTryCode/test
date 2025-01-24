import { createFileRoute } from '@tanstack/react-router';

import { DataGrid } from '~/components/datagrid/datagrid.component';

import { GridPermission } from './type';
import { usePermissionsTable } from './use-permissions-table.hook';

export const Route = createFileRoute('/_main/admin/permissions/_p/')({
  component: PermissionsTable,
  staticData: { title: 'NAVIGATION.PERMISSIONS' },
});

function PermissionsTable() {
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
      pagingMode={'server'}
      paging={paging}
      onPagingChanged={setGridPaging}
      hasWidthSaving={false}
    />
  );
}
