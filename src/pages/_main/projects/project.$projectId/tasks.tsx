import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/projects/project/$projectId/tasks')({
  staticData: {
    title: 'ENTITY.TASKS',
    order: 4,
  },
});
