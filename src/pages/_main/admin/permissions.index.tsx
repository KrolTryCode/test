import { createFileRoute } from '@tanstack/react-router';

import { PermissionsTable } from '~/components/tables/permissions/permissions.component';

export const Route = createFileRoute('/_main/admin/permissions/')({
  component: PermissionsTable,
  staticData: { title: 'NAVIGATION.PERMISSIONS' },
});
