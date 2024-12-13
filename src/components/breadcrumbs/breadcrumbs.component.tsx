import { FC } from 'react';

import { useGetProjectNodeQuery } from '~/api/queries/projects/get-project-node.query';
import { useGetParentsQuery } from '~/api/queries/projects/get-projects-parents.query';
import { projectsPath } from '~/utils/configuration/routes-paths';

import { NodeLogo } from '../node-logo/node-logo.component';

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
      {parents?.map(({ name, id, type }) => (
        <StyledMuiLink key={id} href={`/${projectsPath}/${id}`}>
          <NodeLogo nodeId={id} nodeType={type} size={6.5} />
          {name}
        </StyledMuiLink>
      ))}
      {projectData && (
        <StyledMuiLink fontWeight={'bold'}>
          <NodeLogo nodeId={projectData.id} nodeType={projectData.type} size={6.5} />
          {projectData.name}
        </StyledMuiLink>
      )}
    </StyledBreadcrumbs>
  );
};
