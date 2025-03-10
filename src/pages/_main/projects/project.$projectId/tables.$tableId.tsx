import { TabContext, TabList } from '@mui/lab';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { createFileRoute, Outlet, useChildMatches } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getProjectContentQueryOptions } from '~/api/queries/project-content/get-project-content.query';
import { TabLink } from '~/components/implicit-links';
import { renderTabLabel } from '~/components/render-tab-label';
import { FileRoutesById } from '~/routing/routeTree.gen';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables/$tableId')({
  component: TablePage,
  loader: async ({ context, params: { tableId } }) => {
    const tableData = await context.queryClient.fetchQuery(getProjectContentQueryOptions(tableId));
    context.title = tableData.name;
    return tableData.name;
  },
});

type TableRouteChildren = Required<
  FileRoutesById['/_main/projects/project/$projectId/tables/$tableId']
>['children'];
type TableRouteChild = TableRouteChildren[keyof TableRouteChildren];

function TablePage() {
  const { t } = useTranslation();
  const childMatches = useChildMatches();
  const navigate = Route.useNavigate();

  const { projectId, tableId } = Route.useParams();
  const title = Route.useLoaderData();

  const tabs = (Route.children as TableRouteChild[]).sort(
    (a, b) => (a.options.staticData?.order ?? -1) - (b.options.staticData?.order ?? -1),
  );

  useEffect(() => {
    // временный фикс поломки
    if (!childMatches.length) {
      void navigate({
        to: '/projects/project/$projectId/tables/$tableId/data',
        params: { projectId, tableId },
      });
    }
  }, [childMatches.length, navigate, projectId, tableId]);

  return (
    <Stack height={'100%'}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant={'subtitle1'} marginLeft={1.5} marginTop={0.5}>
          {title}
        </Typography>
        <TabContext value={childMatches?.[0]?.fullPath ?? tabs[0].fullPath}>
          <TabList variant={'scrollable'} scrollButtons={false} visibleScrollbar>
            {tabs.map((route: TableRouteChild) => (
              <TabLink
                key={route.fullPath}
                to={route.fullPath}
                params={{ projectId, tableId }}
                value={route.fullPath}
                label={renderTabLabel(t(route.options.staticData!.title!))}
              />
            ))}
          </TabList>
        </TabContext>
      </Stack>
      <Box flex={1} padding={1} height={'100%'}>
        <Outlet />
      </Box>
    </Stack>
  );
}
