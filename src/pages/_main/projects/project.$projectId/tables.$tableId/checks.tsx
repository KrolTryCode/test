import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '~/routing/_fallbacks/info/work-in-progress.page';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId/checks')({
  component: ChecksList,
  staticData: {
    title: 'STRUCTURE.CHECKS.LABEL',
  },
});

function ChecksList() {
  return <WorkInProgress />;
}
