import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/admin/users')({
  staticData: {
    title: 'NAVIGATION.USERS',
    order: 1,
  },
});
