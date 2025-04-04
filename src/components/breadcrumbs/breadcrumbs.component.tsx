import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { projectNodeQueryOptions } from '~/api/queries/projects/get-project-node.query';
import { getParentsQueryOptions } from '~/api/queries/projects/get-projects-parents.query';
import { ProjectNodeType } from '~/api/utils/api-requests';

import { NodeLogo } from '../node-logo/node-logo.component';

import { MuiLink, StyledBreadcrumbs } from './breadcrumbs.style';

interface ProjectNodeBreadcrumbsProps {
  projectNodeId: string;
}

export const ProjectNodeBreadcrumbs: FC<ProjectNodeBreadcrumbsProps> = ({ projectNodeId }) => {
  const { data: parents = [] } = useQuery(getParentsQueryOptions(projectNodeId ?? ''));
  const { data: projectData } = useQuery(
    projectNodeQueryOptions(projectNodeId, {
      enabled: !!projectNodeId,
    }),
  );

  return (
    <StyledBreadcrumbs separator={'›'} maxItems={5}>
      {parents?.map(({ name, id, type }) => (
        <MuiLink
          key={id}
          to={
            type === ProjectNodeType.Project
              ? '/projects/project/$projectId'
              : '/projects/group/$groupId'
          }
          params={{ projectId: id, groupId: id }}
        >
          <NodeLogo nodeId={id} nodeType={type} size={13} />
          {name}
        </MuiLink>
      ))}
      {projectData && (
        <MuiLink fontWeight={'bold'}>
          <NodeLogo nodeId={projectData.id} nodeType={projectData.type} size={13} />
          {projectData.name}
        </MuiLink>
      )}
    </StyledBreadcrumbs>
  );
};
