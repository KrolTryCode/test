import {
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import {
  AddEntity,
  DataGrid,
  DateTimeEditingCell,
  EnhancedColDef,
  useGetRowActions,
} from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';
import { getCurrentUserTimezone } from '~/app/user/user.store';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { getColDateWithTz } from '~/utils/datagrid/get-col-date-with-tz';
import { applyTzOffset } from '~/utils/date/apply-tz-offset';

import { GroupHeader } from '../group-header/group-header.component';

import { useParticipants } from './use-participants.hook';

const ParticipantsList: FC = () => {
  const { t } = useTranslation();
  const { projectGroupId = '', projectId = '' } = useParams();
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const apiRef = useGridApiRef();

  const {
    roles,
    participants,
    isDataLoading,
    deleteParticipant,
    onUpdateParticipant,
    onAddParticipantClick,
  } = useParticipants(projectId || projectGroupId);

  const { getActions, onRowModesModelChange, rowModesModel } = useGetRowActions({
    apiRef,
    idKey: 'userId',
    entityGenitive: declinatedTranslations.PARTICIPANT.GENITIVE.toLowerCase(),
    deleteHandler: (row: FullProjectNodeMemberInfo) => deleteParticipant(row.userId),
  });

  const columns = useMemo<EnhancedColDef<FullProjectNodeMemberInfo>[]>(
    () => [
      {
        field: 'avatar',
        width: 70,
        align: 'center',
        headerName: t('USER.AVATAR'),
        renderCell({ row: user }: GridRenderCellParams<FullProjectNodeMemberInfo>) {
          const [firstName, lastName] = user.userName.split(' ');
          return <UserAvatar userId={user.userId} firstName={firstName} lastName={lastName} />;
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
        field: 'roleId',
        headerName: t('ENTITY.ROLE'),
        flex: 1,
        type: 'singleSelect',
        editable: true,
        valueOptions: roles,
        getOptionValue: (opt: (typeof roles)[number]) => opt.id,
        getOptionLabel: (opt: (typeof roles)[number]) => opt.title,
      },
      {
        field: 'expirationTime',
        type: 'dateTime',
        headerName: t('COMMON.DATE_EXPIRED'),
        flex: 1,
        editable: true,
        valueGetter: getColDateWithTz,
        renderEditCell: ({ id, field, value }) => (
          <DateTimeEditingCell
            id={id}
            field={field}
            value={value as Date}
            // @ts-expect-error todo: fix interface (ui-components)
            minDateTime={applyTzOffset(new Date().toJSON(), getCurrentUserTimezone())}
            isClearable
          />
        ),
      },
      {
        headerName: t('ENTITY.PARTICIPANT_SOURCE'),
        field: 'authorId',
        flex: 1,
        valueGetter: (authorId: string) => participants.find(p => p.userId === authorId)?.userName,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 82,
        getActions,
      },
    ],
    [t, roles, getActions, participants],
  );

  const onRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <>
      {projectGroupId && !projectId && <GroupHeader groupId={projectGroupId} />}
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
    </>
  );
};

export default ParticipantsList;
