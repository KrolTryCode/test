import { Navigate } from 'react-router-dom';

import { RouteDescription } from '~/routing/routes.types';
import {
  editPath,
  logsPath,
  permissionsPath,
  rolesPath,
  settingsPath,
  templatesPath,
  usersPath,
} from '~/utils/configuration/routes-paths';

export const adminSubroutes: RouteDescription[] = [
  {
    isIndex: true,
    element: <Navigate to={'users'} replace={true} />,
  },
  {
    path: usersPath,
    menuDisplay: { label: 'NAVIGATION.USERS' },
    children: [
      {
        isIndex: true,
        title: 'NAVIGATION.USERS',
        lazyElement: () => import('~/pages/admin/accounts/admin-accounts.page'),
      },
      {
        path: `:userId`,
        title: 'ENTITY.USER',
        lazyElement: () => import('~/pages/admin/accounts/user-account.page'),
      },
    ],
  },
  {
    path: permissionsPath,
    menuDisplay: { label: 'NAVIGATION.PERMISSIONS' },
    lazyElement: () => import('~/pages/admin/permissions/permissions.page'),
    children: [
      {
        isIndex: true,
        element: <Navigate to={permissionsPath} replace={true} />,
      },
      {
        path: permissionsPath,
        title: 'NAVIGATION.PERMISSIONS',
        lazyElement: () =>
          import('~/pages/admin/permissions/permissions-table/permissions-table.page'),
      },
      {
        path: rolesPath,
        title: 'NAVIGATION.ROLES',
        lazyElement: () => import('~/pages/admin/permissions/roles-table/roles-table.page'),
      },
    ],
  },
  {
    path: settingsPath,
    menuDisplay: { label: 'NAVIGATION.SETTINGS' },
    lazyElement: () => import('~/pages/admin/settings/admin-settings.page'),
  },
  {
    path: logsPath,
    menuDisplay: { label: 'NAVIGATION.LOGS' },
    lazyElement: () => import('~/pages/admin/logs/admin-logs.page'),
  },
  {
    path: templatesPath,
    menuDisplay: { label: 'NAVIGATION.TEMPLATES' },
    children: [
      {
        isIndex: true,
        title: 'NAVIGATION.TEMPLATES',
        lazyElement: () => import('~/pages/admin/templates/admin-templates.page'),
      },
      {
        path: `${editPath}/:templateId`,
        title: 'ENTITY.TEMPLATE',
        lazyElement: () => import('~/pages/admin/templates/edit-template.page'),
      },
    ],
  },
];
