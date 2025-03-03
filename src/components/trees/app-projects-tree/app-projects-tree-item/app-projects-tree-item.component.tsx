import { ChevronRight, KeyboardArrowDown } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Button, Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { createLink } from '@tanstack/react-router';
import { FC, useMemo, useState } from 'react';

import { getProjectNodesByParentQueryOptions } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { NodeLogo } from '~/components/node-logo/node-logo.component';

import {
  _IconContainer,
  _ProjectTreeItemContainer,
  _ProjectTreeNodeLink,
  _ToggleButtonContainer,
  _Description,
} from './app-projects-tree-item.styled';

interface ProjectTreeItemProps {
  projectTreeNode: ProjectNode;
}

export const ProjectTreeItem: FC<ProjectTreeItemProps> = ({ projectTreeNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { data: childNodes = [], isLoading } = useQuery(
    getProjectNodesByParentQueryOptions(projectTreeNode.id, {
      enabled: projectTreeNode.hasChildren && isOpened,
    }),
  );

  const treeNodeLink = useMemo(() => {
    const Link = createLink(_ProjectTreeNodeLink);
    return projectTreeNode.type === ProjectNodeType.Group ? (
      <Link to={'/projects/group/$groupId'} params={{ groupId: projectTreeNode.id }}>
        {projectTreeNode.name}
      </Link>
    ) : (
      <Link to={'/projects/project/$projectId'} params={{ projectId: projectTreeNode.id }}>
        {projectTreeNode.name}
      </Link>
    );
  }, [projectTreeNode]);

  return (
    <_ProjectTreeItemContainer>
      <Stack direction={'row'} alignItems={'center'} flex={1}>
        <_ToggleButtonContainer>
          <Button
            hidden={!projectTreeNode.hasChildren}
            variant={'text'}
            size={'small'}
            onClick={() => setIsOpened(isOpened => !isOpened)}
          >
            {isOpened ? <KeyboardArrowDown /> : <ChevronRight />}
          </Button>
        </_ToggleButtonContainer>

        <_IconContainer>
          <NodeLogo
            nodeId={projectTreeNode.id}
            nodeName={projectTreeNode.name}
            nodeType={projectTreeNode.type}
            size={'small'}
            showTypeBadge
          />
        </_IconContainer>

        <Stack>
          {treeNodeLink}
          <_Description
            variant={'body1'}
            hidden={!projectTreeNode.description}
            title={projectTreeNode.description}
            gutterBottom={false}
          >
            {projectTreeNode.description}
          </_Description>
        </Stack>
      </Stack>

      {isOpened && (
        <Stack marginLeft={5}>
          {isLoading ? (
            <Preloader />
          ) : (
            childNodes.map(node => <ProjectTreeItem projectTreeNode={node} key={node.id} />)
          )}
        </Stack>
      )}
    </_ProjectTreeItemContainer>
  );
};
