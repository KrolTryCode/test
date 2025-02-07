import { Typography } from '@mui/material';
import {
  GridEventListener,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowEditStopReasons,
  GridTreeNodeWithRender,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import { DateTimeEditingCell, AddEntity, DataGrid, EnhancedColDef } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';
import { useGetEditRowActions } from '~/components/datagrid/use-get-edit-row-actions.hook';
import { TextLink } from '~/components/implicit-links';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { validateMinDate } from '~/utils/date/validate-min-date';

import { useParticipants } from './use-participants.hook';

interface ParticipantsTableProps {
  nodeId: string;
}

export const ParticipantsTable: FC<ParticipantsTableProps> = ({ nodeId }) => {
  const { t } = useTranslation();
  // const {} = Route.useSearch();
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const apiRef = useGridApiRef();

  const {
    roles,
    participants,
    isDataLoading,
    deleteParticipant,
    onUpdateParticipant,
    onAddParticipantClick,
  } = useParticipants(nodeId);

  const { getActions, onRowModesModelChange, rowModesModel } =
    useGetEditRowActions<FullProjectNodeMemberInfo>({
      apiRef,
      idKey: 'userId',
      entityAccusative: declinatedTranslations.PARTICIPANT.ACCUSATIVE.toLowerCase(),
      editableKey: 'direct',
    });

  const columns = useMemo<EnhancedColDef<FullProjectNodeMemberInfo>[]>(
    () => [
      {
        field: 'avatar',
        width: 70,
        align: 'center',
        headerName: t('USER.AVATAR'),
        groupable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell({ row: user }: GridRenderCellParams<FullProjectNodeMemberInfo>) {
          if (user.userName) {
            const [lastName, firstName] = user.userName.split(' ');
            return <UserAvatar userId={user.userId} firstName={firstName} lastName={lastName} />;
          }
        },
      },
      {
        field: 'userName',
        headerName: t('ENTITY.PARTICIPANT'),
        flex: 2,
      },
      {
        field: 'userEmail',
        headerName: t('USER.EMAIL'),
        flex: 1,
      },
      {
        field: 'nodeName',
        headerName: t('COMMON.SOURCE'),
        flex: 1,
        renderCell({ row: user }: GridRenderCellParams<FullProjectNodeMemberInfo>) {
          return user.direct ? (
            <Typography>{t('ENTITY.DIRECT_PARTICIPANT')}</Typography>
          ) : (
            <TextLink to={'/projects/group/$groupId'} params={{ groupId: user.nodeId }}>
              {user.nodeName}
            </TextLink>
          );
        },
      },
      {
        field: 'roleId',
        headerName: t('ENTITY.ROLE'),
        flex: 1,
        type: 'singleSelect',
        editable: true,
        valueOptions: roles,
        getOptionValue: (opt: (typeof roles)[number]) => opt.id,
        getOptionLabel: (opt: (typeof roles)[number]) => opt.title,
        groupingValueGetter: (roleId: string) => roles.find(r => r.id === roleId)?.title,
      },
      {
        field: 'expirationTime',
        type: 'dateTime',
        headerName: t('COMMON.DATE_EXPIRED'),
        flex: 1,
        editable: true,
        preProcessEditCellProps: preProcessDateTimeEditCellProps,
        renderEditCell: renderDateTimeEditCell,
      },
      {
        headerName: t('ENTITY.PARTICIPANT_SOURCE'),
        field: 'authorId',
        flex: 1,
        valueGetter: (authorId: string) => participants.find(p => p.userId === authorId)?.userName,
        groupingValueGetter: (authorId: string) =>
          participants.find(p => p.userId === authorId)?.userName,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 82,
        getActions: getActions(deleteParticipant),
      },
    ],
    [t, roles, getActions, deleteParticipant, participants],
  );

  const onRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <DataGrid<FullProjectNodeMemberInfo>
      ref={apiRef}
      loading={isDataLoading}
      items={participants}
      totalCount={participants?.length}
      columns={columns}
      getRowId={(row: FullProjectNodeMemberInfo) => row.userId}
      editMode={'row'}
      rowModesModel={rowModesModel}
      onRowModesModelChange={onRowModesModelChange}
      onRowEditStop={onRowEditStop}
      processRowUpdate={onUpdateParticipant}
      customToolbarContent={
        <AddEntity
          customText={t('ACTION.ADD', {
            type: declinatedTranslations.PARTICIPANT.GENITIVE.toLowerCase(),
          })}
          onClick={onAddParticipantClick}
        />
      }
    />
  );
};

function preProcessDateTimeEditCellProps(params: GridPreProcessEditCellProps) {
  const error =
    params.hasChanged && params.props.value instanceof Date
      ? validateMinDate(params.props.value)
      : false;
  return { ...params.props, error };
}

function renderDateTimeEditCell(
  params: GridRenderEditCellParams<FullProjectNodeMemberInfo, any, any, GridTreeNodeWithRender>,
) {
  return <DateTimeEditingCell {...params} minDateTime={new Date()} isClearable />;
}
