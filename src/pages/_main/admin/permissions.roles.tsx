import { createFileRoute } from '@tanstack/react-router';

import { PermissionRoleTable } from '~/components/tables/permission-roles/permission-roles.component';

export const Route = createFileRoute('/_main/admin/permissions/roles')({
  component: PermissionRoleTable,
  staticData: { title: 'NAVIGATION.ROLES' },
});
