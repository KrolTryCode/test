import {
  ChevronRight,
  Folder as FolderIcon,
  KeyboardArrowDown,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { Button, Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { ContentNode, ContentNodeType } from '~/api/utils/api-requests';
import { useProjectContentSelectTreeContext } from '~/components/trees/project-content-select-tree/project-content-select-tree.component';

import {
  _IconContainer,
  _ProjectContentElementLabel,
  _ProjectContentSelectTreeItemContainer,
  _ProjectContentSelectTreeNodeLink,
  _ToggleButtonContainer,
} from './project-content-select-tree-item.styled';

interface ProjectContentSelectTreeItemProps {
  contentTreeNode: ContentNode;
}

export const ProjectContentSelectTreeItem: FC<ProjectContentSelectTreeItemProps> = ({
  contentTreeNode,
}) => {
  const ctx = useProjectContentSelectTreeContext();

  const [isOpened, setIsOpened] = useState(ctx.pathToSelected.includes(contentTreeNode.id));

  const { data: childNodes = [], isLoading } = useQuery(
    getContentNodesByParentQueryOptions(ctx.projectId, contentTreeNode.id, {
      enabled: contentTreeNode.hasChildren && isOpened,
    }),
  );

  const isActive = ctx.isMultiple
    ? (ctx.value ?? []).includes(contentTreeNode.id)
    : ctx.value === contentTreeNode.id;

  const canSelect = ctx.canSelectItem?.(contentTreeNode) ?? true;

  const nodeLogo =
    contentTreeNode.id === '' ? (
      '/'
    ) : contentTreeNode.type === ContentNodeType.Directory ? (
      <FolderIcon />
    ) : (
      <TableChartIcon />
    );

  const handleChange = useCallback(() => {
    if (!canSelect) {
      return;
    }

    if (ctx.isMultiple === true) {
      const value = ctx.value ?? [];
      ctx.onChange?.(
        value.includes(contentTreeNode.id)
          ? value.filter(v => v !== contentTreeNode.id)
          : [...value, contentTreeNode.id],
      );
    } else {
      ctx.onChange?.(contentTreeNode.id);
    }
  }, [canSelect, ctx, contentTreeNode.id]);

  return (
    <Box>
      <_ProjectContentSelectTreeItemContainer>
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

        <_ProjectContentElementLabel
          onClick={() => handleChange()}
          className={classNames({ active: isActive, disabled: !canSelect })}
        >
          <_IconContainer>{nodeLogo}</_IconContainer>
          {contentTreeNode.name}
        </_ProjectContentElementLabel>
      </_ProjectContentSelectTreeItemContainer>

      {isOpened && (
        <Stack marginLeft={2}>
          {isLoading ? (
            <Preloader />
          ) : (
            childNodes.map(node => (
              <ProjectContentSelectTreeItem contentTreeNode={node} key={node.id} />
            ))
          )}
        </Stack>
      )}
    </Box>
  );
};
