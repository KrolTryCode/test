import { Box } from '@mui/material';
import { PersistentDrawer, Preloader, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useState } from 'react';

import { useTablesMenuData } from '../_components/use-tables-menu-data.hook';

import { CreateMenu } from './tables.$tableId/_components/create-menu.component';
import { NodesTree } from './tables.$tableId/_components/nodes-tree.component';
import { useNavTreeActions } from './tables.$tableId/_components/use-nav-tree-actions.hook';

export const Route = createFileRoute('/_main/projects/project/$projectId/tables')({
  staticData: {
    title: 'NAVIGATION.TABLES',
    order: 1,
  },
  component: TablesLayout,
});

function TablesLayout() {
  const { treeData: _, isFetched, isLoading } = useTablesMenuData();
  const { handleAddCatalog: _h } = useNavTreeActions([]);
  const { drawerWidth } = useGetDrawerThemeWidth();

  const [isDrawerOpened, setIsDrawerOpened] = useState(true);

  if (isLoading || !isFetched) {
    return <Preloader />;
  }
  return (
    <Box
      sx={({ spacing }) => ({
        position: 'relative',
        height: `calc(100% + ${spacing(1)})`,
        '& .MuiDrawer-paper': { position: 'absolute', top: 0 },
      })}
    >
      <PersistentDrawer isInitialOpen={true} onDrawerOpenState={setIsDrawerOpened}>
        <Box position={'absolute'}>
          <CreateMenu />
        </Box>
        <Box marginTop={1} sx={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
          <NodesTree />
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
