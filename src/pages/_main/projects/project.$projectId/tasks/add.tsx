import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetProjectTaskQuery } from '~/api/queries/projects/tasks/get-project-task.query';
import { IAddTaskForm, TaskForm } from '~/components/forms/task/task-form';
import { TaskParametersForm } from '~/components/forms/task/task-parameters-form';
import { useTaskActions } from '~/use-cases/task-actions.hook';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks/add')({
  component: AddTaskPage,
});

function AddTaskPage() {
  const { t } = useTranslation();
  const { projectId } = Route.useParams();
  const { createTask, startTask, isTaskStarting, isTaskCreating, isTaskCreated, isTaskStarted } =
    useTaskActions(projectId);

  const [isLockedForm, setIsLockedForm] = useState(false);
  const [baseData, setBaseData] = useState<IAddTaskForm>({ name: '', description: '', formId: '' });
  const [createdTaskId, setIsCreatedTaskId] = useState('');
  const [showStatusLoader, setShowStatusLoader] = useState(false);
  const navigate = Route.useNavigate();

  const { data: taskInfo, isFetching: isFetchingStatus } = useGetProjectTaskQuery(createdTaskId, {
    enabled: !!createdTaskId,
    refetchInterval: 2000,
  });

  const navigateToTasksList = () =>
    void navigate({ to: '/projects/project/$projectId/tasks', params: { projectId } });

  const handleCreateTask = async (data: FieldValues) => {
    return createTask(
      { ...baseData, notes: '', parameters: { params: data, type: 'indanis-calculation-task' } },
      { onSuccess: data => setIsCreatedTaskId(data.id!) },
    );
  };

  const handleStartTask = async () => {
    await startTask(createdTaskId);
  };

  useEffect(() => {
    if (isFetchingStatus) {
      setShowStatusLoader(true);
      setTimeout(() => {
        setShowStatusLoader(false);
      }, 400);
    }
  }, [isFetchingStatus]);

  return (
    <Stack padding={1} gap={2}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant={'h2'} component={'h3'}>
          {t('ACTION.CREATE', { type: t('ENTITY.TASK').toLowerCase() })}
        </Typography>
        {createdTaskId && (
          <Box marginLeft={'auto'} display={'flex'} alignItems={'center'} gap={1}>
            {showStatusLoader && (
              <CircularProgress
                size={'1em'}
                color={'primary'}
                sx={{ animationDuration: '300ms' }}
              />
            )}
            <Typography textAlign={'right'} gutterBottom={false}>
              <b>{t('COMMON.STATUS')}: </b>
              {t(`STATUS.${taskInfo?.state?.toUpperCase()}`)}
            </Typography>
          </Box>
        )}
      </Stack>

      <TaskForm
        isDisabled={isLockedForm}
        onReject={navigateToTasksList}
        onResolve={data => {
          setBaseData(data);
          setIsLockedForm(true);
        }}
      />

      {isLockedForm && (
        <Stack gap={2}>
          <Divider />
          <Typography variant={'h2'} component={'h3'}>
            {t('TASK.SET_PARAMETERS')}
          </Typography>
          <TaskParametersForm
            formId={baseData.formId}
            createdTaskInfo={taskInfo}
            onStartTask={handleStartTask}
            onCreateTask={handleCreateTask}
            onGoToTasksList={navigateToTasksList}
            onCancel={() => setIsLockedForm(false)}
            isTaskCreating={isTaskCreating}
            isTaskStarting={isTaskStarting}
            isTaskCreated={isTaskCreated}
            isTaskStarted={isTaskStarted}
          />
        </Stack>
      )}
    </Stack>
  );
}
