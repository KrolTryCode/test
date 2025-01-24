import { createFileRoute } from '@tanstack/react-router';

import WorkInProgress from '~/pages/_fallbacks/info/work-in-progress/work-in-progress.page';

export const Route = createFileRoute('/_main/projects/project/$projectId/events')({
  component: WorkInProgress,
  staticData: {
    title: 'NAVIGATION.EVENTS',
    order: 8,
  },
});
