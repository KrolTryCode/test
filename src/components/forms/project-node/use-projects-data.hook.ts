import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { getProjectNodesByParentQueryOptions } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { getProjectNodesTreeQueryOptions } from '~/api/queries/projects/get-project-nodes-tree.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { projectsPath } from '~/utils/configuration/routes-paths';

export function useProjectsData() {
  const { groupId, projectId = '' } = useParams({ strict: false });
  const { data: childrenNodes = [], isLoading: isChildrenLoading } = useQuery(
    getProjectNodesByParentQueryOptions(groupId, {
      // временное устранение задвоения(?) данных
      select: data => {
        return data.reduce<typeof data>((acc, cur) => {
          if (acc.some(v => v.id === cur.id)) {
            return acc;
          }
          return [...acc, cur];
        }, []);
      },
    }),
  );
  const { data: treeData = [], isLoading: isTreeLoading } = useQuery(
    getProjectNodesTreeQueryOptions({
      select: data => nodesWithHrefSelector(data, projectId, projectsPath),
    }),
  );

  return {
    treeData,
    projectNodesByParent: childrenNodes,
    isLoading: isChildrenLoading || isTreeLoading,
  };
}
