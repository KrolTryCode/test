import { TabContext, TabList } from '@mui/lab';
import { Tab, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useLocation, useOutletContext } from 'react-router-dom';

import { permissionsPath, rolesPath } from '~/utils/configuration/routes-paths';

const TabValue = {
  PERMISSIONS: 'permissions',
  ROLES: 'roles',
};

const Permissions: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const outletContext = useOutletContext();

  const tabValue = useMemo(() => getTab(pathname), [pathname]);

  return (
    <TabContext value={tabValue}>
      <TabList>
        <Tab
          component={NavLink}
          to={permissionsPath}
          label={
            <Typography variant={'h2'} gutterBottom={false}>
              {t('NAVIGATION.PERMISSIONS')}
            </Typography>
          }
          value={TabValue.PERMISSIONS}
        />
        <Tab
          component={NavLink}
          to={rolesPath}
          label={
            <Typography variant={'h2'} gutterBottom={false}>
              {t('NAVIGATION.ROLES')}
            </Typography>
          }
          value={TabValue.ROLES}
        />
      </TabList>
      <Outlet context={outletContext} />
    </TabContext>
  );
};

function getTab(currentPath: string): string {
  let tab = currentPath.split('/').reverse()[0];
  if (!Object.values(TabValue).includes(tab)) {
    tab = TabValue.PERMISSIONS;
  }
  return tab;
}

export default Permissions;
