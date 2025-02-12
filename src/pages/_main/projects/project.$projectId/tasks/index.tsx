import { Edit as EditIcon } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, DeleteCellButton, EnhancedColDef } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

import { useGetProjectTasksQuery } from '~/api/queries/projects/tasks/get-project-tasks.query';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo, TaskState } from '~/api/utils/api-requests';
import { taskModal } from '~/components/forms/task/task-form';
import { useTaskActions } from '~/use-cases/task-actions.hook';
import { downloadBlobFile } from '~/utils/files';
import { useCustomTranslations } from '~/utils/hooks';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks/')({
  component: TasksList,
});

function TasksList() {
  const { projectId } = Route.useParams();
  const { t, translateStatus, getStatusValueOptions } = useCustomTranslations();
  const { startTask, updateTask, archiveTask } = useTaskActions(projectId);
  const { data: taskList = [], isLoading: isTaskListLoading } = useGetProjectTasksQuery(projectId);
  const navigate = useNavigate();

  const handleEditTask = useCallback(
    (task: FullTaskInfo) => {
      taskModal({
        data: task,
        isEditing: true,
        title: t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() }),
        onOk: data => void updateTask({ ...data, taskId: task.id! }),
      });
    },
    [t, updateTask],
  );

  const handleAddTask = () =>
    void navigate({
      to: '/projects/project/$projectId/tasks/add',
      params: { projectId },
    });

  // TODO изменить получение имени файла (Заголовок content-disposition)
  const handleDownloadFile = useCallback(async (taskId: string) => {
    await ApiClientSecured.applicationTasksV1Controller
      .getTaskResults(taskId, { format: 'blob' })
      .then(res => downloadBlobFile(res, `${taskId}-output.zip`));
  }, []);

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
            <GridActionsCellItem
              showInMenu
              key={'download'}
              disabled={row.state !== TaskState.Successed}
              label={t('ACTION.DOWNLOAD')}
              title={t('ACTION.DOWNLOAD')}
              onClick={() => handleDownloadFile(row.id!)}
            />,
            <GridActionsCellItem
              showInMenu
              key={'start'}
              disabled={row.state !== TaskState.ReadyToStart}
              label={t('ACTION.RUN', { what: t('ENTITY.TASK').toLowerCase() })}
              title={t('ACTION.RUN', { what: t('ENTITY.TASK').toLowerCase() })}
              onClick={() => startTask(row.id!)}
            />,
            <GridActionsCellItem
              key={'edit'}
              color={'primary'}
              icon={<EditIcon />}
              label={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
              title={t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() })}
              onClick={() => handleEditTask(row)}
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
      handleDownloadFile,
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
