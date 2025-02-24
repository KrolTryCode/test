import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useArchiveTaskMutation } from '~/api/queries/projects/tasks/archive-task.mutation';
import { useCreateProjectTaskMutation } from '~/api/queries/projects/tasks/create-task.mutation';
import { useStartProjectTaskMutation } from '~/api/queries/projects/tasks/start-task.mutation';
import { useUpdateTaskMutation } from '~/api/queries/projects/tasks/update-task.mutation';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo } from '~/api/utils/api-requests';
import { taskModal } from '~/components/forms/task/task-form';
import { downloadBlobFile } from '~/utils/files';
import { showErrorMessage } from '~/utils/show-error-message';

export const useTaskActions = (projectId: string) => {
  const { t } = useTranslation();

  const {
    mutateAsync: createTask,
    isPending: isTaskCreating,
    isSuccess: isTaskCreated,
  } = useCreateProjectTaskMutation(projectId, {
    onSuccess: () => notifySuccess(t('MESSAGE.CREATION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });
  const {
    mutateAsync: startTask,
    isPending: isTaskStarting,
    isSuccess: isTaskStarted,
  } = useStartProjectTaskMutation({
    onSuccess: () => notifySuccess(t('MESSAGE.RUN_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.RUN_TASK_FAILED'),
  });

  const { mutateAsync: updateTask } = useUpdateTaskMutation({
    onSuccess: () => notifySuccess(t(`MESSAGE.UPDATE_SUCCESS`)),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const { mutateAsync: archiveTask } = useArchiveTaskMutation({
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
  });

  const handleEditTask = useCallback(
    (task: FullTaskInfo, onOk?: () => void) => {
      taskModal({
        data: task,
        isEditing: true,
        title: t('ACTION.EDIT', { type: t('ENTITY.TASK').toLowerCase() }),
        onOk: data => void updateTask({ ...data, taskId: task.id! }).then(onOk),
      });
    },
    [t, updateTask],
  );

  // TODO изменить получение имени файла (Заголовок content-disposition)
  const downloadTaskResults = useCallback(async (taskId: string) => {
    const res = await ApiClientSecured.applicationTasksV1Controller.getTaskResults(taskId, {
      format: 'blob',
    });
    downloadBlobFile(res, `${taskId}-output.zip`);
  }, []);

  return {
    createTask,
    updateTask,
    archiveTask,
    startTask,
    isTaskCreating,
    isTaskCreated,
    isTaskStarting,
    isTaskStarted,
    handleEditTask,
    downloadTaskResults,
  };
};
