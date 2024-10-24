import { useParams } from 'react-router-dom';

import { useGetProjectNodesByParent } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { useGetProjectNodesTree } from '~/api/queries/projects/get-project-nodes-tree.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { projectsPath } from '~/utils/configuration/routes-paths';

export function useProjectsData() {
  const { projectGroupId, projectId = '' } = useParams();
  const { data: childrenNodes = [], isLoading: isChildrenLoading } =
    useGetProjectNodesByParent(projectGroupId);
  const { data: treeData = [], isLoading: isTreeLoading } = useGetProjectNodesTree({
    select: data => nodesWithHrefSelector(data, projectId, projectsPath),
  });

  return {
    treeData,
    projectNodesByParent: childrenNodes,
    isLoading: isChildrenLoading || isTreeLoading,
  };
}
