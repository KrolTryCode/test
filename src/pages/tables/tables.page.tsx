import { Box } from '@mui/material';
import { PersistentDrawer, Preloader, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

// import { NotFoundNodes } from '~/pages/_fallbacks/errors/not-found/not-found.component';
import { CreateMenu } from '~/pages/tables/create-menu.component';
import { NodesTree } from '~/pages/tables/tree/nodes-tree.component';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';

const TablesLayout: FC = () => {
  const { isFetched, isLoading } = useTablesMenuData();
  // const { handleAddCatalog } = useNavTreeActions([]);
  const { drawerWidth } = useGetDrawerThemeWidth();

  const [isDrawerOpened, setIsDrawerOpened] = useState(true);

  if (isLoading || !isFetched) {
    return <Preloader />;
  }

  // TODO Добавить поддержку изменения ширины Drawer?

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
};

export default TablesLayout;
