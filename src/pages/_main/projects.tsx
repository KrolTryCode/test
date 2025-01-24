import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/projects')({
  staticData: {
    title: 'ENTITY.PROJECTS',
    order: 2,
  },
  beforeLoad: ({ location }) => {
    if (location.pathname === '/projects' || location.pathname === '/projects/') {
      return redirect({ to: '/projects/group' });
    }
  },
});
