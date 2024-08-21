import { ContentSubtree } from '~/api/utils/api-requests';
import { DEFAULT_PROJECT_ID } from '~/app/user/user.store';
import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { tablesPath } from '~/utils/configuration/routes-paths';

export const nodesWithHrefSelector = (data: ContentSubtree[]) => {
  const transformNode = (projectId: string, node: ContentSubtree): NavTreeItemData => ({
    id: node.id,
    type: node.type,
    label: node.name,
    href: `/${tablesPath}/${node.id}`,
    children:
      node.children.length !== 0
        ? node.children.map(child => transformNode(projectId, child))
        : undefined,
  });

  return data.map(node => transformNode(DEFAULT_PROJECT_ID, node));
};
