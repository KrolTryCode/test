import { Edit, DeleteOutline } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { NodeHeader } from '~/components/node-header/node-header.component';
import { usePageTitle } from '~/utils/hooks/use-page-title';

import { useProjectsTreeActions } from '../use-projects-tree-actions.hook';

interface ProjectHeaderProps {
  projectId: string;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({ projectId }) => {
  const { t } = useTranslation();
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectNodeQuery(projectId);
  usePageTitle(projectData?.name);

  const { data: parentData, isLoading: isParentDataLoading } = useGetProjectNodeQuery(
    projectData?.parentId ?? '',
    { enabled: !!projectData?.parentId },
  );

  const { updateProjectOrGroup, deleteProjectOrGroup } = useProjectsTreeActions();

  if (isProjectDataLoading || isParentDataLoading) {
    return (
      <>
        <Skeleton width={'90%'} height={32} />
        <Skeleton width={'80%'} height={32} />
      </>
    );
  }

  return (
    <NodeHeader
      {...projectData!}
      id={projectId}
      backPath={getBackPath(parentData)}
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

function getBackPath(parentData?: ProjectNode): string {
  // TODO:
  if (!parentData) {
    return '/projects/group';
  } else if (parentData.type === ProjectNodeType.Group) {
    return `/projects/group/${parentData?.id}`;
  } else if (parentData.type === ProjectNodeType.Project) {
    return `/projects/project/${parentData?.id}`;
  }

  return '..';
}
