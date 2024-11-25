import { BackupTable, ChevronRight, Folder, KeyboardArrowDown } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Button, Preloader } from '@pspod/ui-components';
import { FC, useMemo, useState } from 'react';

import { useGetProjectNodesByParentQuery } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';

import {
  _IconContainer,
  _ProjectTreeItemContainer,
  _ProjectTreeNodeLink,
  _ToggleButtonContainer,
} from './project-tree-item.styled';

interface ProjectTreeItemProps {
  projectTreeNode: ProjectNode;
}

export const ProjectTreeItem: FC<ProjectTreeItemProps> = ({ projectTreeNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { data: childNodes = [], isLoading } = useGetProjectNodesByParentQuery(projectTreeNode.id, {
    enabled: projectTreeNode.hasChildren && isOpened,
  });

  const link = useMemo(
    () =>
      projectTreeNode.type === ProjectNodeType.Group
        ? `/projects/${projectTreeNode.id}`
        : `/projects/project/${projectTreeNode.id}`,
    [projectTreeNode],
  );

  const icon = useMemo(
    () =>
      projectTreeNode.logoPath ? (
        <img src={projectTreeNode.logoPath} alt={projectTreeNode.name} />
      ) : projectTreeNode.type === ProjectNodeType.Group ? (
        <Folder />
      ) : (
        <BackupTable />
      ),
    [projectTreeNode],
  );

  return (
    <_ProjectTreeItemContainer>
      <Stack direction={'row'} alignItems={'center'} flex={1}>
        <_ToggleButtonContainer>
          {projectTreeNode.hasChildren && (
            <Button variant={'text'} onClick={() => setIsOpened(isOpened => !isOpened)}>
              {isOpened ? <KeyboardArrowDown /> : <ChevronRight />}
            </Button>
          )}
        </_ToggleButtonContainer>

        <_IconContainer>{icon}</_IconContainer>

        <Stack>
          <_ProjectTreeNodeLink to={link}>{projectTreeNode.name}</_ProjectTreeNodeLink>
          {projectTreeNode.description && (
            <Typography variant={'body1'}>{projectTreeNode.description}</Typography>
          )}
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
