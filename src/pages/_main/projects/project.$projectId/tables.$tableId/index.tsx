import { createFileRoute } from '@tanstack/react-router';

import { getProjectContentQueryOptions } from '~/api/queries/project-content/get-project-content.query';
import { ProjectTable } from '~/components/tables/project-table/project-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId/')({
  component: TablePage,
  loader: async ({ context, params: { tableId } }) => {
    const tableData = await context.queryClient.fetchQuery(getProjectContentQueryOptions(tableId));
    context.title = tableData.name;
  },
});

function TablePage() {
  const { projectId, tableId } = Route.useParams();
  return <ProjectTable projectId={projectId} tableId={tableId} />;
}
