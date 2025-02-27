import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid-premium';
import { FC } from 'react';

import { Notification } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { useNotificationsTable } from '~/components/tables/notifications/notifications.hook';
import { MarkAsReadUnreadButton } from '~/components/tables/notifications/toolbar-buttons/mark-unread-button.component';
import { ShowOnlyUnreadNotifications } from '~/components/tables/notifications/toolbar-buttons/show-only-unread-button.component';

export const NotificationsTable: FC = () => {
  const {
    paging,
    columns,
    isLoading,
    totalCount,
    notifications,
    handleMarkRead,
    selectedRowsIds,
    onPagingChanged,
    isOnlyUnreadShown,
    handleRowSelectionModelChange,
    toggleShowOnlyUnreadNotifications,
  } = useNotificationsTable();

  return (
    <DataGrid<Notification>
      rowSelection
      items={notifications}
      paging={paging}
      columns={columns}
      checkboxSelection
      loading={isLoading}
      pagingMode={'server'}
      totalCount={totalCount}
      disableRowSelectionOnClick
      onPagingChanged={onPagingChanged}
      rowSelectionModel={selectedRowsIds}
      onRowSelectionModelChange={handleRowSelectionModelChange}
      pinnedColumns={{ left: [GRID_CHECKBOX_SELECTION_COL_DEF.field] }}
      customToolbarContent={
        <>
          <MarkAsReadUnreadButton
            items={notifications}
            selectedIds={selectedRowsIds}
            onClick={hasUnread => handleMarkRead(hasUnread, selectedRowsIds as string[])}
          />
          <ShowOnlyUnreadNotifications
            isOnlyUnreadShown={isOnlyUnreadShown}
            handleChange={toggleShowOnlyUnreadNotifications}
          />
        </>
      }
    />
  );
};
