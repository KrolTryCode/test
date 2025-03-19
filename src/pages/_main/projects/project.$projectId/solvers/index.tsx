import { createFileRoute } from '@tanstack/react-router';

import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { SolversTable } from '~/components/tables/solvers/solvers-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/solvers/')({
  component: SolversPage,
  loader: async ({ context: { queryClient }, params: { projectId } }) => {
    await queryClient.fetchQuery(getSolversQueryOptions(projectId));
  },
});

function SolversPage() {
  const { projectId } = Route.useParams();
  return <SolversTable projectId={projectId} />;
}
