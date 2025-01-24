import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/admin/templates')({
  staticData: {
    title: 'NAVIGATION.TEMPLATES',
    order: 6,
  },
});
