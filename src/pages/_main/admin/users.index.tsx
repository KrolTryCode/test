import { createFileRoute } from '@tanstack/react-router';

import { UsersTable } from '~/components/tables/users/users-table';

export const Route = createFileRoute('/_main/admin/users/')({
  component: UsersTable,
});
