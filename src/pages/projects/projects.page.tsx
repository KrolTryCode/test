import { Typography } from '@mui/material';
import { Preloader } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetProjectNodesByParent } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { ProjectTreeItem } from '~/components/project-tree-item/project-tree-item.component';

import { GroupHeader } from './group-header/group-header.component';
import { _ProjectsTreeContainer } from './projects.style';

const ProjectsList: FC = () => {
  const { t } = useTranslation();
  const { projectGroupId } = useParams();
  const { data: currentLevelNodes = [], isLoading } = useGetProjectNodesByParent(projectGroupId);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <GroupHeader groupId={projectGroupId} />

      {currentLevelNodes.length ? (
        <_ProjectsTreeContainer>
          {currentLevelNodes.map(node => (
            <ProjectTreeItem projectTreeNode={node} key={node.id} />
          ))}
        </_ProjectsTreeContainer>
      ) : (
        <Typography variant={'subtitle2'} textAlign={'center'} color={'secondary'}>
          {t('ERROR.NOT_FOUND_NODES.TEXT1')}
        </Typography>
      )}
    </>
  );
};

export default ProjectsList;
