import { TabList, TabContext } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { createFileRoute, Outlet, useChildMatches, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TabLink } from '~/components/implicit-links';
import { ProjectHeader } from '~/components/node-header/project-header.component';
import { renderTabLabel } from '~/components/render-tab-label';
import { FileRoutesById } from '~/routing/routeTree.gen';

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

type ProjectRouteChildren = Required<
  FileRoutesById['/_main/projects/project/$projectId']
>['children'];
type ProjectRouteChild = ProjectRouteChildren[keyof ProjectRouteChildren];

function ProjectTabsLayout() {
  const { t } = useTranslation();

  const { projectId } = Route.useParams();
  const navigate = Route.useNavigate();

  const childMatches = useChildMatches();

  const tabs = (Route.children as ProjectRouteChild[]).sort(
    (a, b) => (a.options.staticData?.order ?? -1) - (b.options.staticData?.order ?? -1),
  );

  useEffect(() => {
    // временный фикс поломки
    if (!childMatches.length) {
      void navigate({
        to: '/projects/project/$projectId/tables',
        params: { projectId },
        replace: true,
      });
    }
  }, [childMatches.length, navigate, projectId]);

  return (
    <Stack flexDirection={'column'} height={'100%'}>
      <ProjectHeader projectId={projectId} />
      <TabContext value={childMatches?.[0]?.fullPath ?? tabs[0].fullPath}>
        <TabList variant={'scrollable'} scrollButtons={false} visibleScrollbar>
          {tabs.map((route: ProjectRouteChild) => (
            <TabLink
              key={route.fullPath}
              to={route.fullPath}
              params={{ projectId }}
              value={route.fullPath}
              label={renderTabLabel(t(route.options.staticData!.title!))}
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
