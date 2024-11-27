import { ArrowBack, Edit, DeleteOutline } from '@mui/icons-material';
import { Skeleton, Stack, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { ProjectNodeBreadcrumbs } from '~/components/breadcrumbs/breadcrumbs.component';
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
    <Stack padding={1} gap={2} direction={'row'} justifyContent={'space-between'}>
      <Button component={Link} variant={'text'} to={backPath} icon={<ArrowBack />} />
      <Stack flex={1} gap={0.5} overflow={'hidden'}>
        <Stack direction={'row'} gap={2} alignItems={'center'}>
          <Typography
            variant={'h2'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            gutterBottom={false}
          >
            {projectData?.name ?? t('TREE.NODE')}
          </Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Button
              size={'small'}
              color={'primary'}
              title={t('ACTION.EDIT')}
              onClick={() => updateProjectOrGroup(projectData!)}
              variant={'text'}
              icon={<Edit />}
            />
            <Button
              size={'small'}
              color={'error'}
              title={t('ACTION.DELETE')}
              variant={'text'}
              icon={<DeleteOutline />}
              onClick={() => deleteProjectOrGroup(projectData!)}
            />
          </Stack>
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
        <ProjectNodeBreadcrumbs projectNodeId={projectId} />
      </Stack>
    </Stack>
  );
};
