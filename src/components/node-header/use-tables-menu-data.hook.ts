import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { getProjectNodesTreeOptions } from '~/api/queries/nodes/get-project-nodes-tree.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { projectPath, projectsPath, tablesPath } from '~/utils/configuration/routes-paths';

export function useTablesMenuData() {
  const { projectId = '' } = useParams({ strict: false });
  const {
    data = [],
    isLoading,
    isFetched,
  } = useQuery(
    getProjectNodesTreeOptions(projectId, {
      enabled: !!projectId,
      select: data =>
        nodesWithHrefSelector(
          data,
          projectId,
          `${projectsPath}/${projectPath}/${projectId}/${tablesPath}`,
        ),
    }),
  );

  return { treeData: data, isLoading, isFetched };
}
