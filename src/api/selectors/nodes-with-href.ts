import { ContentSubtree, ProjectNode } from '~/api/utils/api-requests';
import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';

type NodeType = ContentSubtree | ProjectNode;

//TODO: переписать с учетом ленивой подгрузки дерева групп и проектов (https://tracker.yandex.ru/FE-56)

export const nodesWithHrefSelector = (data: NodeType[], projectId: string, path: string) => {
  const transformNode = (projectId: string, node: NodeType): NavTreeItemData => ({
    id: node.id,
    type: node.type,
    label: node.name,
    href: `/${path}/${node.id}`,
    description: 'description' in node ? node.description : '',
    children:
      'children' in node && node.children.length !== 0
        ? node.children.map(child => transformNode(projectId, child))
        : undefined,
  });

  return data.map(node => transformNode(projectId, node));
};
