import { Box, Typography } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetContentNodesByParent } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { ContentNodeType } from '~/api/utils/api-requests';
import { NodesTreeItem } from '~/components/nodes-tree-item/nodes-tree-item.component';
import { NodesTreeListProps } from '~/pages/_main/projects/project.$projectId/tables.$tableId/tree/nodes-tree.type';

export const NodesTreeList: FC<NodesTreeListProps> = ({
  showOnlyFolders = false,
  onSelection,
  selectedId,
  hideDropdown,
  error,
  disableLinks,
}) => {
  const { t } = useTranslation();
  const { projectId = '' } = useParams({ strict: false });
  const { data: firstLevelNodes = [], isLoading } = useGetContentNodesByParent(projectId, '', {
    select: data => {
      return showOnlyFolders ? data.filter(item => item.type === ContentNodeType.Directory) : data;
    },
  });

  if (isLoading) {
    return <Preloader />;
  }

  return firstLevelNodes.length ? (
    <Box
      border={onSelection && 'solid 1px'}
      borderColor={theme => (error ? theme.palette.error.main : theme.palette.primary.main)}
      borderRadius={2}
    >
      {firstLevelNodes.map(node => (
        <NodesTreeItem
          key={node.id}
          selectedId={selectedId}
          onSelection={onSelection}
          hideDropdown={hideDropdown}
          disableLinks={disableLinks}
          showOnlyFolders={showOnlyFolders}
          contentNode={{ ...node, parentId: '' }}
        />
      ))}
    </Box>
  ) : (
    <Box justifyContent={'center'} display={'flex'}>
      <Typography variant={'subtitle2'} color={'secondary'}>
        {t('ERROR.NOT_FOUND_NODES.TEXT1')}
      </Typography>
    </Box>
  );
};
