import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import { Skeleton, Stack, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { ProjectNodeBreadcrumbs } from '~/components/breadcrumbs/breadcrumbs.component';
import { CreateMenu } from '~/pages/projects/group-header/create-menu.component';
import { useProjectsTreeActions } from '~/pages/projects/use-projects-tree-actions.hook';
import { projectsPath } from '~/utils/configuration/routes-paths';
import { usePageTitle } from '~/utils/hooks/use-page-title';

interface GroupHeaderProps {
  groupId?: string;
}

export const GroupHeader: FC<GroupHeaderProps> = ({ groupId }) => {
  const { t } = useTranslation();
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

  return (
    <Stack padding={1} gap={2} direction={'row'} justifyContent={'space-between'}>
      <Button component={Link} size={'large'} variant={'text'} to={backPath} icon={<ArrowBack />} />
      <Stack flex={1} overflow={'hidden'}>
        <Stack direction={'row'} gap={0.5} alignItems={'flex-start'}>
          <Typography variant={'h2'} overflow={'hidden'} textOverflow={'ellipsis'} paddingRight={1}>
            {projectData?.name ?? t('TREE.NODE')}
          </Typography>
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
            color={'error'}
            title={t('ACTION.DELETE')}
            variant={'text'}
            icon={<Delete />}
            onClick={() => deleteProjectOrGroup(projectData!)}
          />
        </Stack>
        <Typography
          whiteSpace={'break-spaces'}
          maxHeight={'6em'}
          overflow={'hidden auto'}
          gutterBottom={false}
        >
          {projectData?.description}
        </Typography>
      </Stack>
      <Stack alignItems={'flex-end'} flex={1}>
        <ProjectNodeBreadcrumbs projectNodeId={groupId} />
      </Stack>
    </Stack>
  );
};
