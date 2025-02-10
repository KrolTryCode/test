import { FC } from 'react';

import { DataGrid } from '~/components/datagrid/datagrid.component';

import { usePermissionsTable } from './permissions.hook';
import { GridPermission } from './permissions.type';

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
      pagingMode={'server'}
      paging={paging}
      onPagingChanged={setGridPaging}
      hasWidthSaving={false}
    />
  );
};
