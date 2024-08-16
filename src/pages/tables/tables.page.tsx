import { Box } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { NodesTree } from '~/pages/tables/tree/nodes-tree.component';
import {
  Panel,
  PanelGroup,
  PanelResizer,
} from '~/ui-components/resizable-panels/resizable-panels.component';
import { tablesPath } from '~/utils/configuration/routes-paths';

const TablesLayout: FC = () => {
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
