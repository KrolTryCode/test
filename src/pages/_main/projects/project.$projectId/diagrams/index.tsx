// src/pages/_main/projects/project.$projectId/diagrams/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { DiagramsTable } from '~/components/tables/diagrams/diagrams-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/diagrams/')({
  component: DiagramsPage,
});

function DiagramsPage() {
  const { projectId } = Route.useParams();
  return <DiagramsTable projectId={projectId} />;
}
