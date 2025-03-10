import { Stack, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { CreateTaskRequest } from '~/api/utils/api-requests';
import { TaskForm } from '~/components/forms/task/task-form';
import { ITaskForm } from '~/components/forms/task/task-form.schema';
import { useTaskActions } from '~/use-cases/task-actions.hook';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks/add')({
  component: AddTaskPage,
});

function AddTaskPage() {
  const { t } = useTranslation();
  const { projectId } = Route.useParams();
  const { createTask, isTaskCreating } = useTaskActions(projectId);

  const navigate = Route.useNavigate();

  const navigateToTasksList = () =>
    void navigate({ to: '/projects/project/$projectId/tasks', params: { projectId } });

  const handleCreateTask = async (data: ITaskForm) =>
    createTask({
      ...data,
      name: data.name ?? '',
      description: data.description ?? '',
      notes: '',
      parameters: {
        params: data.parameters,
        type: 'indanis-calculation-task',
      } as CreateTaskRequest['parameters'],
    }).then(
      task =>
        void navigate({
          to: '/projects/project/$projectId/tasks/$taskId',
          params: { taskId: task.id! },
        }),
    );

  return (
    <Stack padding={1} gap={2}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.CREATE', { type: t('ENTITY.TASK').toLowerCase() })}
      </Typography>

      <TaskForm
        isPending={isTaskCreating}
        onReject={navigateToTasksList}
        onResolve={handleCreateTask}
      />
    </Stack>
  );
}
