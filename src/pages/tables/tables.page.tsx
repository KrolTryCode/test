import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';
import { PersistentDrawer, Preloader, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NotFoundNodes } from '~/pages/_fallbacks/errors/not-found/not-found.component';
import { NodesTree } from '~/pages/tables/tree/nodes-tree.component';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';

const TablesLayout: FC = () => {
  const { treeData, isFetched, isLoading } = useTablesMenuData();
  const { handleAddCatalog } = useNavTreeActions([]);
  const { drawerWidth } = useGetDrawerThemeWidth();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (isFetched) {
      setOpenDrawer(!!treeData.length);
    }
  }, [isFetched, treeData.length]);

  if (isLoading) {
    return <Preloader />;
  }

  // TODO Добавить поддержку изменения ширины Drawer?

  return (
    <>
      <PersistentDrawer
        open={openDrawer}
        handleDrawerClose={() => setOpenDrawer(false)}
        paperMargin={'14em 0 0 0'}
      >
        <NodesTree />
      </PersistentDrawer>
      <IconButton onClick={() => setOpenDrawer(true)} color={'primary'} disabled={!treeData.length}>
        <MenuIcon />
      </IconButton>
      <Box marginLeft={openDrawer ? `${drawerWidth}px` : 0} height={'calc(100% - 40px)'}>
        {!treeData.length ? <NotFoundNodes action={handleAddCatalog} /> : <Outlet />}
      </Box>
    </>
  );
};

export default TablesLayout;
