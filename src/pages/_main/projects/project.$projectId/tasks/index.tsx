import { PreviewOutlined } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

import { getProjectTasksQueryOptions } from '~/api/queries/projects/tasks/get-project-tasks.query';
import { FullTaskInfo, TaskState } from '~/api/utils/api-requests';
import { GridActionsCellItemLink } from '~/components/implicit-links';
import { useTaskActions } from '~/use-cases/task-actions.hook';
import { useCustomTranslations } from '~/utils/hooks';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks/')({
  component: TasksList,
});

function TasksList() {
  const { projectId } = Route.useParams();
  const { t, translateStatus, getStatusValueOptions } = useCustomTranslations();
  const { startTask, handleEditTask, downloadTaskResults, archiveTask } = useTaskActions(projectId);
  const { data: taskList = [], isLoading: isTaskListLoading } = useQuery(
    getProjectTasksQueryOptions(projectId),
  );
  const navigate = useNavigate();

  const handleAddTask = () =>
    void navigate({
      to: '/projects/project/$projectId/tasks/add',
      params: { projectId },
    });

  const columns = useMemo<EnhancedColDef<FullTaskInfo>[]>(
    () => [
      {
        field: 'name',
        headerName: t('COMMON.TITLE'),
        width: 200,
      },
      {
        field: 'description',
        headerName: t('COMMON.DESCRIPTION'),
        width: 200,
      },
      {
        field: 'authorId',
        headerName: t('COMMON.AUTHOR'),
        width: 200,
        valueGetter: (_, row) => row.authorName,
        groupingValueGetter: (_, row) => row.authorName,
      },
      {
        field: 'priority',
        type: 'number',
        headerName: t('COMMON.PRIORITY'),
        width: 100,
      },
      {
        field: 'state',
        headerName: t('COMMON.STATUS'),
        width: 150,
        type: 'singleSelect',
        valueOptions: () => getStatusValueOptions(Object.values(TaskState)),
        groupingValueGetter: translateStatus,
      },

      {
        field: 'created',
        type: 'dateTime',
        headerName: t('COMMON.DATE_CREATED'),
        width: 200,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions({ row }) {
          return [
            <GridActionsCellItemLink
              key={'show'}
              icon={<PreviewOutlined />}
              label={t('ACTION.VIEW', { type: t('ENTITY.TASK').toLowerCase() })}
              title={t('ACTION.VIEW', { type: t('ENTITY.TASK').toLowerCase() })}
              color={'primary'}
              to={'/projects/project/$projectId/tasks/$taskId'}
              params={{ taskId: row.id!, projectId }}
            />,
            <GridActionsCellItem
              key={'edit'}
              color={'primary'}
              showInMenu
              label={t('ACTION.EDIT')}
              onClick={() => handleEditTask(row)}
            />,
            <GridActionsCellItem
              showInMenu
              key={'download'}
              disabled={row.state !== TaskState.Successed}
              label={t('ACTION.DOWNLOAD')}
              title={t('ACTION.DOWNLOAD')}
              onClick={() => downloadTaskResults(row.id!)}
            />,
            <GridActionsCellItem
              showInMenu
              key={'start'}
              disabled={row.state !== TaskState.ReadyToStart}
              label={t('ACTION.RUN')}
              title={t('ACTION.RUN')}
              onClick={() => startTask(row.id!)}
            />,
            <DeleteCellButton
              showInMenu
              key={'delete'}
              entity={t('ENTITY.TASK')}
              deleteHandler={() => void archiveTask(row.id!)}
            />,
          ];
        },
      },
    ],
    [
      t,
      translateStatus,
      getStatusValueOptions,
      projectId,
      downloadTaskResults,
      startTask,
      handleEditTask,
      archiveTask,
    ],
  );

  return (
    <DataGrid<FullTaskInfo>
      items={taskList}
      columns={columns}
      loading={isTaskListLoading}
      totalCount={taskList.length ?? 0}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={
        <AddEntity
          onClick={handleAddTask}
          customText={t('ACTION.CREATE', { type: t('ENTITY.TASK').toLowerCase() })}
        />
      }
    />
  );
}
