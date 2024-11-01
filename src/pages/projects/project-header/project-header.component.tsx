import { ArrowBack } from '@mui/icons-material';
import { Breadcrumbs, Link as MuiLink, Skeleton, Stack, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { useGetProjectNode } from '~/api/queries/projects/get-project-node.query';
import { useGetParents } from '~/api/queries/projects/get-projects-parents.query';
import { projectPath, projectsPath } from '~/utils/configuration/routes-paths';
import { usePageTitle } from '~/utils/hooks/use-page-title';

export const ProjectHeader: FC = () => {
  const { projectGroupId, projectId = '' } = useParams();
  const { data: projectData, isLoading: isProjectDataLoading } = useGetProjectNode(
    projectGroupId ?? projectId,
  );
  usePageTitle(projectData?.name);

  const { t } = useTranslation();
  const { data: parents = [], isLoading: isParentsLoading } = useGetParents(projectData?.id ?? '', {
    select: data => [...data].reverse(),
  });

  if (isParentsLoading || isProjectDataLoading) {
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
      <Button component={Link} size={'large'} variant={'text'} to={backPath} icon={<ArrowBack />} />
      <Stack flex={1} overflow={'hidden'}>
        <Stack direction={'row'} gap={1} alignItems={'flex-start'}>
          <Typography variant={'h2'} overflow={'hidden'} textOverflow={'ellipsis'}>
            {projectData?.name ?? t('TREE.NODE')}
          </Typography>
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
        <Breadcrumbs
          separator={'›'}
          sx={({ palette }) => {
            return {
              color: palette.primary.main,
            };
          }}
        >
          {parents?.map(({ name, id }) => (
            <MuiLink key={id} href={`/${projectsPath}/${id}`} underline={'hover'} color={'inherit'}>
              {name}
            </MuiLink>
          ))}
          <MuiLink
            href={`/${projectsPath}/${projectPath}/${projectData?.id}`}
            underline={'hover'}
            color={'inherit'}
          >
            {projectData?.name}
          </MuiLink>
        </Breadcrumbs>
      </Stack>
    </Stack>
  );
};
