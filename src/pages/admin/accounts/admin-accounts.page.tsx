import EditIcon from '@mui/icons-material/Edit';
import {
  GridActionsCellItem,
  useGridApiRef,
  GridColDef,
  GridRenderCellParams,
  GridCellParams,
  GridCellModes,
} from '@mui/x-data-grid-premium';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGetUsersQuery } from '~/api/queries/users/get-users.query';
import { selectPageableData } from '~/api/selectors/pageable';
import { UpdateAccountRequestStateEnum, User, UserStateEnum } from '~/api/utils/api-requests';
import { DeleteCellButton } from '~/components/delete-cell-button/delete-cell-button.component';
import { AvatarCell } from '~/ui-components/datagrid/cells/avatar.component';
import { DataGrid } from '~/ui-components/datagrid/datagrid.component';
import { GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { translateStatus } from '~/utils/translate-status';

import { useAdminAccounts } from './admin-accounts.hook';
import { CreateAccountButton } from './create-account/create-account-button.component';

const AdminUsersPage: FC = () => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();

  const [gridPaging, setGridPaging] = useState<GridPagingParams>();
  const { data: usersList, isLoading } = useGetUsersQuery(gridPaging, {
    select: selectPageableData,
  });

  const { modifyAccount, startReactivation, approveAccount, declineAccount, updateUserRow } =
    useAdminAccounts();

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
        renderCell({ row: { id } }: GridRenderCellParams<User>) {
          return AvatarCell(id ?? '');
        },
      },
      {
        field: 'firstName',
        headerName: t('USER.FIRST_NAME'),
        flex: 1,
      },
      {
        field: 'lastName',
        headerName: t('USER.LAST_NAME'),
        flex: 1,
      },
      {
        field: 'created',
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
        sortable: false, // todo: Не работает
        valueFormatter(value: string) {
          return translateStatus(value);
        },
      },
      {
        field: 'admin',
        headerName: t('USER.ADMIN'),
        flex: 1,
        type: 'boolean',
        headerAlign: 'left',
        editable: true,
        sortable: false, // todo: Не работает
      },
      {
        field: 'actions',
        width: 80,
        type: 'actions',
        disableReorder: true,
        getActions({ row: { state, id } }) {
          return [
            <GridActionsCellItem
              key={'edit'}
              title={t('ACTION.EDIT')}
              label={t('ACTION.EDIT')}
              icon={<EditIcon />}
              component={Link}
              // @ts-expect-error types
              to={id as string}
            />,
            <GridActionsCellItem
              key={'block-unblock'}
              showInMenu
              label={t(state === UserStateEnum.Blocked ? 'ACTION.UNBLOCK' : 'ACTION.BLOCK')}
              onClick={() => {
                void modifyAccount(
                  id as string,
                  state === UserStateEnum.Blocked
                    ? UpdateAccountRequestStateEnum.Active
                    : UpdateAccountRequestStateEnum.Blocked,
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
            <DeleteCellButton key={'delete'} showInMenu deleteHandler={() => {} /* TODO */} />,
          ];
        },
      },
    ],
    [approveAccount, declineAccount, modifyAccount, startReactivation, t],
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
      loading={isLoading}
      items={usersList?.items ?? []}
      totalCount={usersList?.totalCount ?? 0}
      columns={columns}
      getRowClassName={({ row: { state } }) => (state === UserStateEnum.Blocked ? 'error' : '')}
      onCellClick={handleCellClick}
      paging={gridPaging}
      onPagingChanged={setGridPaging}
      pagingMode={'server'}
      processRowUpdate={updateUserRow}
      customToolbarContent={<CreateAccountButton />}
    />
  );
};

export default AdminUsersPage;
