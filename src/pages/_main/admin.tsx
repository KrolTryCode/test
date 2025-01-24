import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/admin')({
  staticData: {
    accessBy: ['ADMIN'],
    title: 'NAVIGATION.ADMIN',
    order: 1,
  },
  beforeLoad: ({ location }) => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      return redirect({ to: '/admin/users' });
    }
  },
});
