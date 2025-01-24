import { DeleteOutline, Edit, People } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { useLocation } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { ProjectNode, ProjectNodeType } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { NodeHeader } from '~/components/node-header/node-header.component';
import { useProjectsTreeActions } from '~/pages/_main/projects/_components/use-projects-tree-actions.hook';
import { usePageTitle } from '~/utils/hooks/use-page-title';

import { CreateMenu } from './create-menu.component';

interface GroupHeaderProps {
  groupId: string;
}

export const GroupHeader: FC<GroupHeaderProps> = ({ groupId }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectNodeQuery(groupId, {
    enabled: !!groupId,
  });

  const { data: parentData, isLoading: isParentDataLoading } = useGetProjectNodeQuery(
    projectData?.parentId ?? '',
    { enabled: !!projectData?.parentId },
  );

  usePageTitle(projectData?.name);

  const { deleteProjectOrGroup, updateProjectOrGroup } = useProjectsTreeActions();

  if (isProjectDataLoading || isParentDataLoading) {
    return (
      <>
        <Skeleton width={'90%'} height={32} />
        <Skeleton width={'80%'} height={32} />
      </>
    );
  }

  const renderActions = () => (
    <>
      <Button
        size={'small'}
        color={'primary'}
        title={t('ACTION.EDIT')}
        onClick={() => updateProjectOrGroup(projectData!)}
        variant={'text'}
        icon={<Edit />}
      />
      <CreateMenu />
      <ButtonLink
        size={'small'}
        color={'primary'}
        title={t('NAVIGATION.PARTICIPANTS')}
        icon={<People />}
        // todo:
        variant={pathname.includes('participants') ? 'contained' : 'text'}
        to={
          pathname.includes('participants') ? pathname.replace('participants', '') : 'participants'
        }
      />
      <Button
        size={'small'}
        color={'error'}
        title={t('ACTION.DELETE')}
        variant={'text'}
        icon={<DeleteOutline />}
        onClick={() => deleteProjectOrGroup(projectData!)}
      />
    </>
  );

  return (
    <NodeHeader
      {...projectData!}
      id={groupId}
      backPath={getBackPath(parentData)}
      actions={renderActions()}
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
