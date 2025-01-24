import { useCallback } from 'react';

import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';

export const useTreeNodesUtils = (treeData: NavTreeItemData[]) => {
  const getParentsIdsList = useCallback(
    (childId: string): string[] => {
      const result: string[] = [];

      const traverse = (nodes: NavTreeItemData[]): boolean => {
        for (const node of nodes) {
          if (node.id === childId) {
            result.push(node.id);
            return true;
          }

          if (node.children && node.children.length > 0) {
            const found = traverse(node.children);
            if (found) {
              result.push(node.id);
              return true;
            }
          }
        }

        return false;
      };

      traverse(treeData);
      return result;
    },
    [treeData],
  );

  const getAllIds = useCallback((nodes: NavTreeItemData[]): string[] => {
    return nodes.reduce((acc: string[], node) => {
      acc.push(node.id);

      if (node.children) {
        acc.push(...getAllIds(node.children));
      }

      return acc;
    }, []);
  }, []);

  const findNode = useCallback(
    (nodeId: string, items = treeData): NavTreeItemData | undefined => {
      for (const item of items) {
        if (item.id === nodeId) {
          return item;
        }

        if (item.children && item.children.length > 0) {
          const result = findNode(nodeId, item.children);
          if (result) {
            return result;
          }
        }
      }

      return undefined;
    },
    [treeData],
  );

  const filterNodes = useCallback(
    (searchValue: string, nodes = treeData): NavTreeItemData[] => {
      return nodes.reduce((acc: NavTreeItemData[], node) => {
        const filteredChildren = node.children ? filterNodes(searchValue, node.children) : [];

        if (filteredChildren.length > 0 || node.label.toLowerCase().includes(searchValue)) {
          const filteredNode = { ...node, children: filteredChildren };
          acc.push(filteredNode);
        }

        return acc;
      }, []);
    },
    [treeData],
  );

  return { getParentsIdsList, filterNodes, getAllIds, findNode };
};
