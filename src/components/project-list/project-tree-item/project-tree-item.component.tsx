import { ChevronRight, KeyboardArrowDown } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Button, Preloader } from '@pspod/ui-components';
import { FC, useState } from 'react';

import { useGetProjectNodesByParentQuery } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { ProjectNode } from '~/api/utils/api-requests';
import { NodeLogo } from '~/components/node-logo/node-logo.component';

import {
  _IconContainer,
  _ProjectTreeItemContainer,
  _ProjectTreeNodeLink,
  _ToggleButtonContainer,
  _Description,
} from './project-tree-item.styled';

interface ProjectTreeItemProps {
  projectTreeNode: ProjectNode;
}

export const ProjectTreeItem: FC<ProjectTreeItemProps> = ({ projectTreeNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { data: childNodes = [], isLoading } = useGetProjectNodesByParentQuery(projectTreeNode.id, {
    enabled: projectTreeNode.hasChildren && isOpened,
  });

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
          />
        </_IconContainer>

        <Stack>
          <_ProjectTreeNodeLink
            to={`/projects/${projectTreeNode.type.toLowerCase()}/${projectTreeNode.id}`}
          >
            {projectTreeNode.name}
          </_ProjectTreeNodeLink>
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
