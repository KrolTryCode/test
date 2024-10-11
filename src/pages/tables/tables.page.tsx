import { Box } from '@mui/material';
import { Panel, PanelGroup, PanelResizer } from '@pspod/ui-components';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { NotFoundNodes } from '~/pages/_fallbacks/errors/not-found/not-found.component';
import { NodesTree } from '~/pages/tables/tree/nodes-tree.component';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';
import { tablesPath } from '~/utils/configuration/routes-paths';

const TablesLayout: FC = () => {
  const { treeData, isLoading } = useTablesMenuData();
  const { handleAddCatalog } = useNavTreeActions([]);

  if (!treeData.length && !isLoading) {
    return <NotFoundNodes action={handleAddCatalog} />;
  }

  return (
    <PanelGroup autoSaveId={tablesPath} direction={'horizontal'}>
      <Panel minSize={11} defaultSize={15}>
        <Box height={'100%'} overflow={'auto'}>
          <NodesTree />
        </Box>
      </Panel>
      <PanelResizer />
      <Panel minSize={20}>
        <Outlet />
      </Panel>
    </PanelGroup>
  );
};

export default TablesLayout;
