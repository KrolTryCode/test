import { createFileRoute } from '@tanstack/react-router';

import { ProjectTable } from '~/components/tables/project-table/project-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId/')({
  component: TablePage,
});

function TablePage() {
  const { projectId, tableId } = Route.useParams();
  return <ProjectTable projectId={projectId} tableId={tableId} />;
}
