import { GridEventListener, GridRowEditStopReasons, useGridApiRef } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, EnhancedColDef, useGetRowActions } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';
import { projectsPath } from '~/utils/configuration/routes-paths';
import { getColDateWithTz } from '~/utils/datagrid/get-col-date-with-tz';

import { ProjectHeader } from '../project-header/project-header.component';

import { useParticipants } from './use-participants.hook';

const ParticipantsList: FC = () => {
  const { t } = useTranslation();
  const { projectGroupId = '', projectId = '' } = useParams();
  const apiRef = useGridApiRef();

  const {
    roles,
    participantGenitive,
    participants,
    isDataLoading,
    deleteParticipant,
    onUpdateParticipant,
    onAddParticipantClick,
  } = useParticipants(projectId || projectGroupId);

  const { getActions, onRowModesModelChange, rowModesModel } = useGetRowActions({
    apiRef,
    idKey: 'userId',
    entityGenitive: participantGenitive,
    deleteHandler: (row: FullProjectNodeMemberInfo) => deleteParticipant(row.userId),
  });

  const columns = useMemo<EnhancedColDef<FullProjectNodeMemberInfo>[]>(
    () => [
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
      {projectGroupId && !projectId && (
        <ProjectHeader backPath={`/${projectsPath}/${projectGroupId}`} />
      )}
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
            customText={t('ACTION.ADD', { type: participantGenitive.toLowerCase() })}
            onClick={onAddParticipantClick}
          />
        }
      />
    </>
  );
};

export default ParticipantsList;
