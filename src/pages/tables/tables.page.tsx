import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';
import { PersistentDrawer, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NotFoundNodes } from '~/pages/_fallbacks/errors/not-found/not-found.component';
import { NodesTree } from '~/pages/tables/tree/nodes-tree.component';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';

const TablesLayout: FC = () => {
  const { treeData, isLoading } = useTablesMenuData();
  const { handleAddCatalog } = useNavTreeActions([]);
  const { drawerWidth } = useGetDrawerThemeWidth();

  const [openDrawer, setOpenDrawer] = useState(true);

  if (!treeData.length && !isLoading) {
    return <NotFoundNodes action={handleAddCatalog} />;
  }

  // TODO Добавить поддержку изменения ширины Drawer?

  return (
    <Box>
      <PersistentDrawer
        open={openDrawer}
        handleDrawerClose={() => setOpenDrawer(false)}
        paperMargin={'14em 0 0 0'}
      >
        <NodesTree />
      </PersistentDrawer>
      <IconButton onClick={() => setOpenDrawer(true)} color={'primary'}>
        <MenuIcon />
      </IconButton>
      <Box marginLeft={openDrawer ? `${drawerWidth}px` : 0}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TablesLayout;
