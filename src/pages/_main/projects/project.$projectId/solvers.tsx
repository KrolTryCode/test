import { createFileRoute } from '@tanstack/react-router';

import { SolversTable } from '~/components/tables/solvers/solvers-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/solvers')({
  component: SolversPage,
  staticData: {
    title: 'NAVIGATION.SOLVERS',
    order: 2,
  },
});

function SolversPage() {
  const { projectId } = Route.useParams();
  return <SolversTable projectId={projectId} />;
}
