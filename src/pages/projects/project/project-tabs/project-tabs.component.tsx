import { TabList, TabContext } from '@mui/lab';
import { Tab, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext, useLocation, NavLink, Outlet } from 'react-router-dom';

import {
  PROJECT_TABS,
  ProjectTabValue,
} from '~/pages/projects/project/project-tabs/project-tabs.type';

export const ProjectTabs: FC = () => {
  const outletContext = useOutletContext();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const renderLabel = (text: string) => (
    <Typography
      variant={'h4'}
      component={'h2'}
      marginInline={'6px'}
      lineHeight={1}
      gutterBottom={false}
    >
      {t(text)}
    </Typography>
  );

  const tabValue = useMemo(() => getTab(pathname), [pathname]);

  return (
    <TabContext value={tabValue}>
      <TabList variant={'scrollable'} scrollButtons={false} visibleScrollbar>
        <Tab
          component={NavLink}
          to={PROJECT_TABS.TABLES}
          value={PROJECT_TABS.TABLES}
          disabled={tabValue === PROJECT_TABS.TABLES}
          label={renderLabel('NAVIGATION.TABLES')}
        />
        <Tab
          component={NavLink}
          to={PROJECT_TABS.TASKS}
          value={PROJECT_TABS.TASKS}
          disabled={tabValue === PROJECT_TABS.TASKS}
          label={renderLabel('ENTITY.TASKS')}
        />
        <Tab
          component={NavLink}
          to={PROJECT_TABS.REPORTS}
          value={PROJECT_TABS.REPORTS}
          disabled={tabValue === PROJECT_TABS.REPORTS}
          label={renderLabel('NAVIGATION.REPORTS')}
        />
        <Tab
          component={NavLink}
          to={PROJECT_TABS.SETTINGS}
          value={PROJECT_TABS.SETTINGS}
          disabled={tabValue === PROJECT_TABS.SETTINGS}
          label={renderLabel('NAVIGATION.SETTINGS')}
        />
        <Tab
          component={NavLink}
          to={PROJECT_TABS.PARTICIPANTS}
          value={PROJECT_TABS.PARTICIPANTS}
          disabled={tabValue === PROJECT_TABS.PARTICIPANTS}
          label={renderLabel('NAVIGATION.PARTICIPANTS')}
        />
        <Tab
          component={NavLink}
          to={PROJECT_TABS.EVENTS}
          value={PROJECT_TABS.EVENTS}
          disabled={tabValue === PROJECT_TABS.EVENTS}
          label={renderLabel('NAVIGATION.EVENTS')}
        />
      </TabList>
      <Outlet context={outletContext} />
    </TabContext>
  );
};

function getTab(currentPath: string): ProjectTabValue {
  let tab = currentPath.split('/').reverse()[0];
  if (!Object.values(PROJECT_TABS).includes(tab)) {
    tab = PROJECT_TABS.TABLES;
  }
  return tab;
}
