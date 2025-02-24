import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/projects/project/$projectId/solvers')({
  staticData: {
    title: 'NAVIGATION.SOLVERS',
    order: 2,
  },
});
