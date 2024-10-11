import { TreeViewApiType, TreeViewItemData } from '@pspod/ui-components';
import { MutableRefObject } from 'react';

export function getSelfAndAllDescendantIds(
  apiRef: MutableRefObject<TreeViewApiType | undefined>,
  itemId: string,
) {
  const item = apiRef.current?.getItem(itemId);

  if (!item) {
    return [];
  }

  function traverseIds(treeItem: TreeViewItemData) {
    const res = [treeItem.id];

    treeItem.children?.forEach(child => {
      res.push(...traverseIds(child));
    });

    return res;
  }

  return traverseIds(item);
}

export function getSelfAndAllAncestorIds(itemId: string, data: TreeViewItemData[]): string[] {
  function traverseIds(
    { id, children }: TreeViewItemData,
    prevPath: string[] = [],
  ): string[] | null {
    if (id === itemId) {
      return [...prevPath, id];
    }

    if (children?.length) {
      const subPaths = children.map(child => traverseIds(child, [...prevPath, id]));
      for (const subPath of subPaths) {
        if (subPath) {
          return subPath;
        }
      }
      return null;
    }

    return null;
  }

  const paths = data.map(item => traverseIds(item));

  return paths.find(p => !!p) ?? [];
}
