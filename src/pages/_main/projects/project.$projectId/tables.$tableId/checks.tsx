import { createFileRoute } from '@tanstack/react-router';

import { TableChecks } from '~/components/checks/table-checks/table-checks.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId/checks')({
  component: ChecksList,
  staticData: {
    title: 'ENTITY.CHECKS',
    order: 3,
  },
});

function ChecksList() {
  const { tableId } = Route.useParams();
  return <TableChecks tableId={tableId} />;
}
