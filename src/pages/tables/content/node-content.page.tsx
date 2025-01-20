import { Box, Typography } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetContentNodes } from '~/api/queries/nodes/get-content-nodes.query';
import { useGetProjectContentQuery } from '~/api/queries/project-content/get-project-content.query';
import { ContentNodeType } from '~/api/utils/api-requests';
import { renderItemIcon } from '~/components/nav-tree/item/nav-tree-item.utils';
import { EmptyDirectory } from '~/pages/_fallbacks/info/empty/empty-element.component';

import { Table } from './table.component';

const NodeContent: FC = () => {
  const { nodeId = '', projectId = '' } = useParams();
  const { data: nodeInfo, isLoading: isNodeInfoLoading } = useGetProjectContentQuery(nodeId, {
    enabled: !!nodeId,
  });
  const { data: children, isLoading: isChildrenLoading } = useGetContentNodes(projectId, nodeId);

  if (isChildrenLoading || isNodeInfoLoading) {
    return <Preloader />;
  }

  // ничего не выбрано
  if (!nodeId) {
    return <></>;
  }

  if (nodeInfo?.type === ContentNodeType.Table) {
    return <Table nodeInfo={nodeInfo} />;
  }

  if (children?.length === 0) {
    return <EmptyDirectory />;
  }

  return (
    <Box padding={1}>
      {children?.map(c => (
        <Box key={c.id} display={'flex'} alignItems={'center'}>
          {renderItemIcon(c.type)}
          <Typography gutterBottom={false}>{c.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default NodeContent;
