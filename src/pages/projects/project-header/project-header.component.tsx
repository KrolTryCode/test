import { Edit, DeleteOutline } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { NodeHeader } from '~/components/node-header/node-header.component';
import { useProjectsTreeActions } from '~/pages/projects/use-projects-tree-actions.hook';
import { projectsPath } from '~/utils/configuration/routes-paths';
import { usePageTitle } from '~/utils/hooks/use-page-title';

interface ProjectHeaderProps {
  projectId: string;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({ projectId }) => {
  const { t } = useTranslation();
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectNodeQuery(projectId);
  usePageTitle(projectData?.name);

  const { updateProjectOrGroup, deleteProjectOrGroup } = useProjectsTreeActions();

  if (isProjectDataLoading) {
    return (
      <>
        <Skeleton width={'90%'} height={32} />
        <Skeleton width={'80%'} height={32} />
      </>
    );
  }

  const backPath = projectData?.parentId
    ? `/${projectsPath}/${projectData.parentId}`
    : `/${projectsPath}`;

  return (
    <NodeHeader
      nodeId={projectId}
      backPath={backPath}
      description={projectData?.description}
      actions={[
        <Button
          key={'edit'}
          size={'small'}
          color={'primary'}
          title={t('ACTION.EDIT')}
          onClick={() => updateProjectOrGroup(projectData!)}
          variant={'text'}
          icon={<Edit />}
        />,
        <Button
          key={'delete'}
          size={'small'}
          color={'error'}
          title={t('ACTION.DELETE')}
          variant={'text'}
          icon={<DeleteOutline />}
          onClick={() => deleteProjectOrGroup(projectData!)}
        />,
      ]}
    >
      {projectData?.name ?? t('TREE.NODE')}
    </NodeHeader>
  );
};
