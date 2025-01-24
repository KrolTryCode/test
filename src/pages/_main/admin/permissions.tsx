import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/admin/permissions')({
  staticData: {
    title: 'NAVIGATION.PERMISSIONS',
    order: 2,
  },
});
