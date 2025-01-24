import { Permission, Role } from '~/api/utils/api-requests';

interface GridRole extends Omit<Role, 'permissions'> {
  isEnabled: boolean;
}

export interface GridPermission extends Permission {
  roles: GridRole[];
}
