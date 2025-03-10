import { createFileRoute } from '@tanstack/react-router';

import { ProjectTableStructure } from '~/components/tables/project-table-structure/project-table-structure.component';

export const Route = createFileRoute(
  '/_main/projects/project/$projectId/tables/$tableId/structure',
)({
  component: TableStructure,
  staticData: {
    title: 'ENTITY.STRUCTURE',
    order: 2,
  },
});

function TableStructure() {
  const { tableId } = Route.useParams();
  return <ProjectTableStructure tableId={tableId} />;
}
