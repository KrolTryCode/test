import { createFileRoute } from '@tanstack/react-router';

import { RelationshipsTable } from '~/components/tables/project-table-relationships/relationships-table.component';

export const Route = createFileRoute(
  '/_main/projects/project/$projectId/tables/$tableId/relationships',
)({
  component: RouteComponent,
  staticData: {
    title: 'NAVIGATION.RELATIONSHIPS',
    order: 4,
  },
});

function RouteComponent() {
  const { tableId, projectId } = Route.useParams();

  return <RelationshipsTable tableId={tableId} projectId={projectId} />;
}
