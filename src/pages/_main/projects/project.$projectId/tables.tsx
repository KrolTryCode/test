import { Box } from '@mui/material';
import { PersistentDrawer, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';

import { CreateNodeContentMenu } from '~/components/create-menu/create-node-content-menu.component';
import { ProjectContentTree } from '~/components/trees/project-content-tree/project-content-tree.component';
import { useContentNodeActions } from '~/use-cases/content-node-actions.hook';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables')({
  staticData: {
    title: 'NAVIGATION.TABLES',
    order: 1,
  },
  component: TablesLayout,
});

function TablesLayout() {
  const { handleAddCatalog, handleAddTable } = useContentNodeActions();
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
        <Box position={'absolute'} top={'-3px'}>
          <CreateNodeContentMenu addCatalog={handleAddCatalog} addTable={handleAddTable} />
        </Box>
        <Box marginTop={1} marginRight={2} sx={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
          <ProjectContentTree />
        </Box>
      </PersistentDrawer>
      <Box
        position={'relative'}
        height={'100%'}
        paddingLeft={1}
        marginLeft={isDrawerOpened ? `${drawerWidth}px` : 4}
        sx={{ transition: 'margin-left 0.3s ease' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
