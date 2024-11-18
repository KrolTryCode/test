import { Navigate } from 'react-router-dom';

import { tablesSubroutes } from '~/routing/routes/tables-subroutes';
import { RouteDescription } from '~/routing/routes.types';
import {
  eventsPath,
  participantsPath,
  projectPath,
  reportsPath,
  settingsPath,
  tablesPath,
  tasksPath,
} from '~/utils/configuration/routes-paths';

export const projectsSubroutes: RouteDescription[] = [
  {
    isIndex: true,
    path: ':projectGroupId?',
    title: 'ENTITY.PROJECTS',
    lazyElement: () => import('~/pages/projects/projects.page'),
  },
  {
    path: ':projectGroupId/participants',
    title: 'NAVIGATION.PARTICIPANTS',
    lazyElement: () => import('~/pages/projects/paticipants/participants.page'),
  },
  {
    path: `${projectPath}/:projectId`,
    title: 'ENTITY.PROJECT',
    lazyElement: () => import('~/pages/projects/project/project.page'),
    children: [
      {
        isIndex: true,
        element: <Navigate to={tablesPath} replace={true} />,
      },
      {
        path: tablesPath,
        children: tablesSubroutes,
      },
      {
        path: tasksPath,
        lazyElement: () => import('~/pages/projects/project/tasks/tasks.page'),
      },
      {
        path: reportsPath,
        lazyElement: () => import('~/pages/projects/project/reports/reports.page'),
      },
      {
        path: settingsPath,
        lazyElement: () => import('~/pages/projects/project/settings/settings.page'),
      },
      {
        path: participantsPath,
        lazyElement: () => import('~/pages/projects/paticipants/participants.page'),
      },
      {
        path: eventsPath,
        lazyElement: () => import('~/pages/projects/project/events/events.page'),
      },
    ],
  },
];
