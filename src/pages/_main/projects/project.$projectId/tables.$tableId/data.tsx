import { createFileRoute } from '@tanstack/react-router';

import { ProjectTable } from '~/components/tables/project-table/project-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId/data')({
  staticData: {
    title: 'COMMON.DATA',
    order: 1,
  },
  component: TableData,
});

function TableData() {
  const { projectId, tableId } = Route.useParams();
  return <ProjectTable projectId={projectId} tableId={tableId} />;
}
