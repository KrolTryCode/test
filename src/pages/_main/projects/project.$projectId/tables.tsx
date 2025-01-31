import { Box } from '@mui/material';
import { PersistentDrawer, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';

import { CreateNodeMenu } from '~/pages/_main/projects/project.$projectId/tables.$tableId/tree/create-node-menu.component';
import { NodesTreeList } from '~/pages/_main/projects/project.$projectId/tables.$tableId/tree/nodes-tree-list.component';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables')({
  staticData: {
    title: 'NAVIGATION.TABLES',
    order: 1,
  },
  component: TablesLayout,
});

function TablesLayout() {
  const { drawerWidth } = useGetDrawerThemeWidth();
  const [isDrawerOpened, setIsDrawerOpened] = useState(true);

  return (
    <Box
      sx={({ spacing }) => ({
        position: 'relative',
        height: `calc(100% + ${spacing(1)})`,
        '& .MuiDrawer-paper': { position: 'absolute', top: 0 },
      })}
    >
      <PersistentDrawer isInitialOpen={true} onDrawerOpenState={setIsDrawerOpened}>
        <Box position={'absolute'} marginTop={'-3px'}>
          <CreateNodeMenu />
        </Box>
        <Box marginTop={1} marginRight={2} sx={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
          <NodesTreeList />
        </Box>
      </PersistentDrawer>
      <Box
        position={'relative'}
        height={'100%'}
        padding={1}
        marginLeft={isDrawerOpened ? `${drawerWidth}px` : 4}
        sx={{ transition: 'margin-left 0.3s ease' }}
      >
        <Outlet />
        {/* TEMP until BE-143 {!treeData.length ? <NotFoundNodes action={handleAddCatalog} /> : <Outlet />} */}
      </Box>
    </Box>
  );
}
