import { TabList, TabContext } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useChildMatches,
  redirect,
} from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TabLink } from '~/components/implicit-links';

import { ProjectHeader } from './_components/project-header/project-header.component';

export const Route = createFileRoute('/_main/projects/project/$projectId')({
  component: ProjectTabsLayout,
  // todo: поломка при первой загрузке
  beforeLoad: ctx => {
    if (ctx.matches[ctx.matches.length - 1].fullPath === Route.fullPath) {
      return redirect({
        to: '/projects/project/$projectId/tables',
        params: { projectId: ctx.params.projectId },
      });
    }
  },
});

const PROJECT_TABS = {
  tables: 'NAVIGATION.TABLES',
  solvers: 'NAVIGATION.SOLVERS',
  forms: 'NAVIGATION.FORMS',
  tasks: 'ENTITY.TASKS',
  reports: 'NAVIGATION.REPORTS',
  settings: 'NAVIGATION.SETTINGS',
  participants: 'NAVIGATION.PARTICIPANTS',
  events: 'NAVIGATION.EVENTS',
};

function ProjectTabsLayout() {
  const { t } = useTranslation();

  const { projectId } = Route.useParams();
  const navigate = useNavigate();

  const childMatches = useChildMatches();

  useEffect(() => {
    // временный фикс поломки
    if (!childMatches.length) {
      void navigate({
        to: '/projects/project/$projectId/tables',
        params: { projectId },
      });
    }
  }, [childMatches.length, navigate, projectId]);

  const tabValue = useMemo(() => getTab(childMatches[0]?.pathname), [childMatches]);

  return (
    <Stack flexDirection={'column'} height={'100%'}>
      <ProjectHeader projectId={projectId} />
      <TabContext value={tabValue ?? 'tables'}>
        <TabList variant={'scrollable'} scrollButtons={false} visibleScrollbar>
          {Object.entries(PROJECT_TABS).map(([key, label]) => (
            <TabLink
              key={key}
              to={`/projects/project/$projectId/${key}/`}
              params={{ projectId }}
              value={key}
              disabled={tabValue === key}
              label={renderLabel(t(label))}
            />
          ))}
        </TabList>
        <Box flex={1} padding={1}>
          <Outlet />
        </Box>
      </TabContext>
    </Stack>
  );
}

function getTab(currentPath?: string) {
  let tab = currentPath?.split('/').at(-1);
  if (!tab || !Object.keys(PROJECT_TABS).includes(tab)) {
    tab = 'tables';
  }
  return tab;
}

function renderLabel(text: string) {
  return (
    <Typography
      variant={'h4'}
      component={'h2'}
      marginInline={'6px'}
      lineHeight={1}
      gutterBottom={false}
    >
      {text}
    </Typography>
  );
}
