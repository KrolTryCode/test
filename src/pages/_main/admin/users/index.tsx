import EditIcon from '@mui/icons-material/Edit';
import {
  GridActionsCellItem,
  useGridApiRef,
  GridColDef,
  GridRenderCellParams,
  GridCellParams,
  GridCellModes,
} from '@mui/x-data-grid-premium';
import { DeleteCellButton } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountState, User, UserState } from '~/api/utils/api-requests';
import { DataGrid } from '~/components/datagrid/datagrid.component';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

import { useAdminAccounts } from './admin-accounts.hook';
import { CreateAccountButton } from './create-account-button.component';
import { useAccountsPaging } from './use-accounts-paging.hook';

export const Route = createFileRoute('/_main/admin/users/')({
  component: UserListPage,
});

function UserListPage() {
  const { t } = useTranslation();
  const { translateStatus } = useCustomTranslations();
  const apiRef = useGridApiRef();

  const { items, loading, totalCount, onPagingChanged, paging } = useAccountsPaging();

  const {
    modifyAccount,
    startReactivation,
    approveAccount,
    declineAccount,
    updateUserRow,
    deleteAccount,
  } = useAdminAccounts();

  const columns = useMemo<GridColDef<User>[]>(
    () => [
      {
        field: 'id',
        width: 70,
        headerName: t('USER.AVATAR'),
        filterable: false,
        sortable: false,
        resizable: false,
        groupable: false,
        aggregable: false,
        align: 'center',
        renderCell({ row: user }: GridRenderCellParams<User>) {
          return (
            <UserAvatar
              userId={user.id!}
              firstName={user.firstName}
              lastName={user.lastName}
              surName={user.surName}
            />
          );
        },
      },
      {
        field: 'lastName',
        headerName: t('USER.LAST_NAME'),
        flex: 1,
      },
      {
        field: 'firstName',
        headerName: t('USER.FIRST_NAME'),
        flex: 1,
      },
      {
        field: 'surName',
        headerName: t('USER.PATRONYMIC'),
        flex: 1,
      },
      {
        field: 'createdFrom',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        flex: 1,
      },
      {
        field: 'email',
        headerName: t('USER.EMAIL'),
        flex: 1,
      },
      {
        field: 'state',
        headerName: t('COMMON.STATUS'),
        flex: 1,
        valueFormatter: translateStatus,
        // Не работает
        sortable: false,
        groupable: false,
        filterable: false,
      },
      {
        field: 'admin',
        headerName: t('USER.ADMIN'),
        flex: 1,
        type: 'boolean',
        headerAlign: 'left',
        editable: true,
        // Не работает
        sortable: false,
        groupable: false,
        filterable: false,
      },
      {
        field: 'actions',
        width: 84,
        type: 'actions',
        disableReorder: true,
        getActions({ row: { state, id } }) {
          return [
            <GridActionsCellItemLink
              key={'edit'}
              disabled={state === UserState.WaitingForActivation}
              title={t('ACTION.EDIT')}
              label={t('ACTION.EDIT')}
              icon={<EditIcon />}
              to={'/admin/users/$userId'}
              params={{ userId: id! }}
            />,
            <GridActionsCellItem
              key={'block-unblock'}
              showInMenu
              label={t(state === UserState.Blocked ? 'ACTION.UNBLOCK' : 'ACTION.BLOCK')}
              onClick={() => {
                void modifyAccount(
                  id as string,
                  state === UserState.Blocked ? AccountState.Active : AccountState.Blocked,
                );
              }}
            />,
            <GridActionsCellItem
              key={'approve'}
              showInMenu
              label={t('ACTION.APPROVE')}
              onClick={() => {
                void approveAccount(id as string);
              }}
            />,
            <GridActionsCellItem
              key={'decline'}
              showInMenu
              label={t('ACTION.DECLINE')}
              onClick={() => {
                void declineAccount(id as string);
              }}
            />,
            <GridActionsCellItem
              key={'reactivate'}
              showInMenu
              label={t('ACTION.REACTIVATE')}
              onClick={() => {
                void startReactivation(id as string);
              }}
            />,
            <DeleteCellButton
              key={'delete'}
              showInMenu
              deleteHandler={() => {
                void deleteAccount(id as string);
              }}
            />,
          ];
        },
      },
    ],
    [
      approveAccount,
      declineAccount,
      deleteAccount,
      modifyAccount,
      startReactivation,
      t,
      translateStatus,
    ],
  );

  const handleCellClick = ({ id, field }: GridCellParams<User>) => {
    if (field === 'admin') {
      const cellMode = apiRef.current.getCellMode(id, field);
      if (cellMode === GridCellModes.View) {
        apiRef.current.startCellEditMode({ id, field });
      }
    }
  };

  return (
    <DataGrid<User>
      ref={apiRef}
      loading={loading}
      items={items}
      totalCount={totalCount}
      columns={columns}
      getRowClassName={({ row: { state } }) => (state === UserState.Blocked ? 'error' : '')}
      onCellClick={handleCellClick}
      paging={paging}
      onPagingChanged={onPagingChanged}
      pagingMode={'server'}
      processRowUpdate={updateUserRow}
      customToolbarContent={<CreateAccountButton />}
    />
  );
}
