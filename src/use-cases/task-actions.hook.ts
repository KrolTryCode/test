import { notifySuccess } from '@pspod/ui-components';
import { useTranslation } from 'react-i18next';

import { useCreateProjectTaskMutation } from '~/api/queries/projects/tasks/create-task.mutation';
import { useStartProjectTaskMutation } from '~/api/queries/projects/tasks/start-task.mutation';
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

  return {
    createTask,
    startTask,
    isTaskCreating,
    isTaskCreated,
    isTaskStarting,
    isTaskStarted,
  };
};
