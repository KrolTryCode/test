import { Breadcrumbs, Link as MuiLink } from '@mui/material';
import { FC } from 'react';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { useGetParentsQuery } from '~/api/queries/projects/get-projects-parents.query';
import { projectPath, projectsPath } from '~/utils/configuration/routes-paths';

interface ProjectNodeBreadcrumbsProps {
  projectNodeId: string;
}

export const ProjectNodeBreadcrumbs: FC<ProjectNodeBreadcrumbsProps> = ({ projectNodeId }) => {
  const { data: parents = [] } = useGetParentsQuery(projectNodeId ?? '');
  const { data: projectData } = useGetProjectNodeQuery(projectNodeId, {
    enabled: !!projectNodeId,
  });

  return (
    <Breadcrumbs separator={'›'} sx={({ palette: { primary } }) => ({ color: primary.main })}>
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
  );
};
