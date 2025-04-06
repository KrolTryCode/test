// src/pages/_main/projects/project.$projectId/diagrams/index.tsx
import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { DiagramsTable } from '~/components/tables/diagrams/diagrams-table.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/diagrams/')({
  component: DiagramsPage,
});

function DiagramsPage() {
  const { projectId } = Route.useParams();
  return <DiagramsTable projectId={projectId} />;
}
