import { Folder } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetContentNode } from '~/api/queries/nodes/get-content-node.query';
import { useGetContentNodes } from '~/api/queries/nodes/get-content-nodes.query';
import { ContentNodeTypeEnum } from '~/api/utils/api-requests';
import { DEFAULT_PROJECT_ID } from '~/app/application.store';
import { EmptyCatalog, EmptyTable } from '~/pages/_fallbacks/info/empty/empty-element.component';
import { Preloader } from '~/ui-components/preloader/preloader.component';

const NodeContent: FC = () => {
  const { nodeId = '' } = useParams();
  const { data: nodeInfo, isLoading: isNodeInfoLoading } = useGetContentNode(nodeId);
  const { data: children, isLoading: isChildrenLoading } = useGetContentNodes(
    DEFAULT_PROJECT_ID,
    nodeId,
  );

  if (isChildrenLoading || isNodeInfoLoading) {
    return <Preloader />;
  }

  if (children?.length === 0) {
    if (nodeInfo?.type === ContentNodeTypeEnum.Table) {
      return <EmptyTable />;
    } else {
      return <EmptyCatalog />;
    }
  }

  return (
    <Box padding={1}>
      {children?.map(c => (
        <Box key={c.id} display={'flex'}>
          {c.type === ContentNodeTypeEnum.Directory && (
            <Folder color={'primary'} sx={{ marginRight: 0.5 }} />
          )}
          <Typography gutterBottom={false}>{c.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default NodeContent;
