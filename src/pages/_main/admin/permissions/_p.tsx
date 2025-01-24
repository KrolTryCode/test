import { TabContext, TabList } from '@mui/lab';
import { Typography } from '@mui/material';
import { useLocation, Outlet, createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TabLink } from '~/components/implicit-links';

export const Route = createFileRoute('/_main/admin/permissions/_p')({
  component: PermissionsLayout,
  staticData: { title: 'NAVIGATION.PERMISSIONS' },
});

const TabValue = {
  PERMISSIONS: 'permissions',
  ROLES: 'roles',
};

function PermissionsLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const tabValue = useMemo(() => getTab(pathname), [pathname]);

  return (
    <TabContext value={tabValue}>
      <TabList>
        <TabLink
          to={'/admin/permissions'}
          label={
            <Typography variant={'h2'} gutterBottom={false}>
              {t('NAVIGATION.PERMISSIONS')}
            </Typography>
          }
          value={TabValue.PERMISSIONS}
        />
        <TabLink
          to={'/admin/permissions/roles'}
          label={
            <Typography variant={'h2'} gutterBottom={false}>
              {t('NAVIGATION.ROLES')}
            </Typography>
          }
          value={TabValue.ROLES}
        />
      </TabList>
      <Outlet />
    </TabContext>
  );
}

function getTab(currentPath: string): string {
  let tab = currentPath.split('/').reverse()[0];
  if (!Object.values(TabValue).includes(tab)) {
    tab = TabValue.PERMISSIONS;
  }
  return tab;
}
