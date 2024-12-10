import { DeleteOutline, Edit, People } from '@mui/icons-material';
import { Skeleton, Stack } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { NodeHeader } from '~/components/node-header/node-header.component';
import { CreateMenu } from '~/pages/projects/group-header/create-menu.component';
import { useProjectsTreeActions } from '~/pages/projects/use-projects-tree-actions.hook';
import { participantsPath, projectsPath } from '~/utils/configuration/routes-paths';
import { usePageTitle } from '~/utils/hooks/use-page-title';

interface GroupHeaderProps {
  groupId?: string;
}

export const GroupHeader: FC<GroupHeaderProps> = ({ groupId }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectNodeQuery(groupId!, {
    enabled: !!groupId,
  });
  usePageTitle(projectData?.name);

  const { deleteProjectOrGroup, updateProjectOrGroup } = useProjectsTreeActions();

  const backPath = projectData?.parentId
    ? `/${projectsPath}/${projectData.parentId}`
    : `/${projectsPath}`;

  if (isProjectDataLoading) {
    return (
      <>
        <Skeleton width={'90%'} height={32} />
        <Skeleton width={'80%'} height={32} />
      </>
    );
  }

  /* Корневой каталог */
  if (!groupId) {
    return (
      <Stack padding={1} gap={2} direction={'row'} justifyContent={'flex-start'}>
        <CreateMenu />
      </Stack>
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
      <Button
        size={'small'}
        color={'primary'}
        title={t('NAVIGATION.PARTICIPANTS')}
        variant={pathname.includes(participantsPath) ? 'contained' : 'text'}
        icon={<People />}
        component={Link}
        to={
          pathname.includes(participantsPath)
            ? pathname.replace(participantsPath, '')
            : participantsPath
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
      nodeId={groupId}
      backPath={backPath}
      description={projectData?.description}
      actions={renderActions()}
    >
      {projectData?.name ?? t('TREE.NODE')}
    </NodeHeader>
  );
};
