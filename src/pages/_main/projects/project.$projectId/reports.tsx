import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '~/routing/_fallbacks/cases/work-in-progress.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/reports')({
  component: WorkInProgress,
  staticData: {
    title: 'NAVIGATION.REPORTS',
    order: 5,
  },
});
