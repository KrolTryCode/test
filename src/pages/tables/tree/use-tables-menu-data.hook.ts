import { useGetProjectNodesTree } from '~/api/queries/nodes/get-project-nodes-tree.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { DEFAULT_PROJECT_ID } from '~/app/application.store';

export function useTablesMenuData() {
  const { data = [], isLoading } = useGetProjectNodesTree(DEFAULT_PROJECT_ID, {
    select: nodesWithHrefSelector,
  });

  return { treeData: data, isLoading: isLoading };
}
