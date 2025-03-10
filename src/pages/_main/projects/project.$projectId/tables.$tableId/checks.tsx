import { createFileRoute } from '@tanstack/react-router';

import { CheckTables } from '../../../../../components/tables/checks/checks-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId/checks')({
  component: ChecksList,
  staticData: {
    title: 'ENTITY.CHECKS',
    order: 3,
  },
});

function ChecksList() {
  const { tableId } = Route.useParams();
  return <CheckTables tableId={tableId} />;
}
