import { useParams } from 'react-router-dom';

import { useGetProjectNodesTree } from '~/api/queries/nodes/get-project-nodes-tree.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { projectPath, projectsPath, tablesPath } from '~/utils/configuration/routes-paths';

export function useTablesMenuData() {
  const { projectId = '' } = useParams();
  const {
    data = [],
    isLoading,
    isFetched,
  } = useGetProjectNodesTree(projectId, {
    select: data =>
      nodesWithHrefSelector(
        data,
        projectId,
        `${projectsPath}/${projectPath}/${projectId}/${tablesPath}`,
      ),
  });

  return { treeData: data, isLoading, isFetched };
}
