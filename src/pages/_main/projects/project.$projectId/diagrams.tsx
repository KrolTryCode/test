// src/pages/_main/projects/project.$projectId/diagrams.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/projects/project/$projectId/diagrams')({
  staticData: {
    title: 'NAVIGATION.DIAGRAMS',
    order: 9,
  },
});
