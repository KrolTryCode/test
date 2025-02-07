import { Downloading, Edit as EditIcon, PlayCircleOutlined } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import { AddEntity, DataGrid, EnhancedColDef, notifySuccess } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

import { useGetProjectTasksQuery } from '~/api/queries/projects/tasks/get-project-tasks.query';
import { useUpdateTaskMutation } from '~/api/queries/projects/tasks/update-task.mutation';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo, TaskState } from '~/api/utils/api-requests';
import { taskModal } from '~/components/forms/task/task-form';
import { useTaskActions } from '~/use-cases/use-task-actions.hook';
import { downloadBlobFile } from '~/utils/files';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks/')({
  component: TasksList,
});

function TasksList() {
  const { projectId } = Route.useParams();
  const { t, translateStatus, getStatusValueOptions } = useCustomTranslations();
  const { startTask } = useTaskActions();
  const { data: taskList = [], isLoading: isTaskListLoading } = useGetProjectTasksQuery(projectId);
  const navigate = useNavigate();

  const { mutateAsync: updateTask } = useUpdateTaskMutation({
    onSuccess: () => notifySuccess(t(`MESSAGE.UPDATE_SUCCESS`)),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

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
              color={'primary'}
              icon={<Downloading />}
              disabled={row.state !== TaskState.Successed}
              label={t('ACTION.DOWNLOAD')}
              title={t('ACTION.DOWNLOAD')}
              onClick={() => handleDownloadFile(row.id!)}
            />,
            <GridActionsCellItem
              showInMenu
              key={'start'}
              color={'primary'}
              icon={<PlayCircleOutlined />}
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
          ];
        },
      },
    ],
    [t, translateStatus, getStatusValueOptions, handleDownloadFile, startTask, handleEditTask],
  );

  return (
    <DataGrid<FullTaskInfo>
      items={taskList}
      columns={columns}
      loading={isTaskListLoading}
      totalCount={taskList.length ?? 0}
      pinnedColumns={{ right: ['actions'] }}
      customToolbarContent={<AddEntity onClick={handleAddTask} />}
    />
  );
}
