import {
  ChevronRight,
  Folder as FolderIcon,
  KeyboardArrowDown,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { Button, Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createLink } from '@tanstack/react-router';
import { FC, useMemo, useState } from 'react';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { ContentNode, ContentNodeType } from '~/api/utils/api-requests';
import { useDropdownMenuItems } from '~/components/trees/project-content-tree/use-dropdown-menu-items.hook';

import { ProjectContentItemMenu } from './project-content-item-menu.component';
import {
  _IconContainer,
  _ProjectContentTreeItemContainer,
  _ProjectContentTreeNodeLink,
  _ToggleButtonContainer,
} from './project-content-tree-item.styled';

interface ProjectContentTreeItemProps {
  projectId: string;
  parentId?: string;
  contentTreeNode: ContentNode;
}

export const ProjectContentTreeItem: FC<ProjectContentTreeItemProps> = ({
  projectId,
  parentId,
  contentTreeNode,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { menuItems } = useDropdownMenuItems(parentId);

  const { data: childNodes = [], isLoading } = useQuery(
    getContentNodesByParentQueryOptions(projectId, contentTreeNode.id, {
      enabled: contentTreeNode.hasChildren && isOpened,
    }),
  );

  const contentNodeLink = useMemo(() => {
    const Link = createLink(_ProjectContentTreeNodeLink);
    return contentTreeNode.type === ContentNodeType.Directory ? (
      <Link
        to={'/projects/project/$projectId/tables/folders/$folderId'}
        params={{ projectId, folderId: contentTreeNode.id }}
      >
        {contentTreeNode.name}
      </Link>
    ) : (
      <Link
        to={'/projects/project/$projectId/tables/$tableId'}
        params={{ projectId, tableId: contentTreeNode.id }}
      >
        {contentTreeNode.name}
      </Link>
    );
  }, [projectId, contentTreeNode]);

  return (
    <Box>
      <_ProjectContentTreeItemContainer>
        <_ToggleButtonContainer>
          <Button
            hidden={!contentTreeNode.hasChildren}
            variant={'text'}
            size={'small'}
            onClick={() => setIsOpened(isOpened => !isOpened)}
          >
            {isOpened ? <KeyboardArrowDown /> : <ChevronRight />}
          </Button>
        </_ToggleButtonContainer>

        <_IconContainer>
          {contentTreeNode.type === ContentNodeType.Directory ? <FolderIcon /> : <TableChartIcon />}
        </_IconContainer>

        {contentNodeLink}

        <ProjectContentItemMenu item={contentTreeNode} menuItems={menuItems} />
      </_ProjectContentTreeItemContainer>

      {isOpened && (
        <Stack marginLeft={2}>
          {isLoading ? (
            <Preloader />
          ) : (
            childNodes.map(node => (
              <ProjectContentTreeItem
                projectId={projectId}
                parentId={contentTreeNode.id}
                contentTreeNode={node}
                key={node.id}
              />
            ))
          )}
        </Stack>
      )}
    </Box>
  );
};
