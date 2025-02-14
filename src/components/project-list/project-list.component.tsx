import { Typography } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { getProjectNodesByParentQueryOptions } from '~/api/queries/projects/get-project-nodes-by-parent.query';

import { _ProjectsTreeContainer } from './project-list.style';
import { ProjectTreeItem } from './project-tree-item/project-tree-item.component';

export const ProjectList: FC = () => {
  const { groupId } = useParams({ strict: false });

  const { t } = useTranslation();
  const { data: currentLevelNodes = [], isLoading } = useQuery(
    getProjectNodesByParentQueryOptions(groupId),
  );

  if (isLoading) {
    return <Preloader />;
  }

  return currentLevelNodes.length ? (
    <_ProjectsTreeContainer>
      {currentLevelNodes.map(node => (
        <ProjectTreeItem projectTreeNode={node} key={node.id} />
      ))}
    </_ProjectsTreeContainer>
  ) : (
    <Typography variant={'subtitle2'} textAlign={'center'} color={'secondary'}>
      {t('ERROR.NOT_FOUND_NODES.TEXT1')}
    </Typography>
  );
};
