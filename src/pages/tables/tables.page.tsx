import { Box, Stack } from '@mui/material';
import { PersistentDrawer, Preloader, useGetDrawerThemeWidth } from '@pspod/ui-components';
import { FC, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { NotFoundNodes } from '~/pages/_fallbacks/errors/not-found/not-found.component';
import { CreateMenu } from '~/pages/tables/create-menu.component';
import { NodesTree } from '~/pages/tables/tree/nodes-tree.component';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';

const TablesLayout: FC = () => {
  const { treeData, isFetched, isLoading } = useTablesMenuData();
  const { handleAddCatalog } = useNavTreeActions([]);
  const { drawerWidth } = useGetDrawerThemeWidth();
  const { projectId } = useParams();
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectNodeQuery(projectId!);

  const [isDrawerOpened, setIsDrawerOpened] = useState(true);

  useEffect(() => {
    if (isFetched) {
      setIsDrawerOpened(!!treeData.length);
    }
  }, [isFetched, treeData.length]);

  if (isLoading || isProjectDataLoading) {
    return <Preloader />;
  }

  // TODO Добавить поддержку изменения ширины Drawer?

  return (
    <>
      <PersistentDrawer
        isInitialOpen={true}
        paperMargin={`${projectData?.description ? 13.5 : 12}em 0 0 0`}
        onDrawerOpenState={setIsDrawerOpened}
      >
        <Stack direction={'row'}>
          <CreateMenu />
        </Stack>
        <NodesTree />
      </PersistentDrawer>
      <Box
        height={'100%'}
        marginLeft={isDrawerOpened ? `${drawerWidth}px` : '34px'}
        sx={{ transition: 'margin-left 0.3s ease' }}
      >
        {!treeData.length ? <NotFoundNodes action={handleAddCatalog} /> : <Outlet />}
      </Box>
    </>
  );
};

export default TablesLayout;
