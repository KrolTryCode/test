import { FC } from 'react';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { useGetParentsQuery } from '~/api/queries/projects/get-projects-parents.query';
import { projectsPath } from '~/utils/configuration/routes-paths';

import { StyledMuiLink, StyledBreadcrumbs } from './breadcrumbs.style';

interface ProjectNodeBreadcrumbsProps {
  projectNodeId: string;
}

export const ProjectNodeBreadcrumbs: FC<ProjectNodeBreadcrumbsProps> = ({ projectNodeId }) => {
  const { data: parents = [] } = useGetParentsQuery(projectNodeId ?? '');
  const { data: projectData } = useGetProjectNodeQuery(projectNodeId, {
    enabled: !!projectNodeId,
  });

  return (
    <StyledBreadcrumbs separator={'›'} maxItems={5}>
      {parents?.map(({ name, id }) => (
        <StyledMuiLink key={id} href={`/${projectsPath}/${id}`}>
          {name}
        </StyledMuiLink>
      ))}
      <StyledMuiLink fontWeight={'bold'}>{projectData?.name}</StyledMuiLink>
    </StyledBreadcrumbs>
  );
};
