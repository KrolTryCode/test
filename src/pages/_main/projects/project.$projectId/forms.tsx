import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms')({
  staticData: {
    title: 'NAVIGATION.FORMS',
    order: 3,
  },
});
