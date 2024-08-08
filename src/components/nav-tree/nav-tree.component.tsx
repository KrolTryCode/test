import Skeleton from '@mui/material/Skeleton';
import { TreeItemProps, useTreeViewApiRef } from '@mui/x-tree-view';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { TreeView } from '~/ui-components/tree-view/tree-view.component';
import {
  getSelfAndAllAncestorIds,
  getSelfAndAllDescendantIds,
} from '~/ui-components/tree-view/tree-view.utils';

import { NavTreeItem } from './nav-tree-item.component';
import { NavTreeProps } from './nav-tree.type';
import { useNavTreeHrefLUT } from './use-nav-tree-href-lut.hook';

export const NavTree: FC<NavTreeProps> = ({ isLoading = false, data, baseUrl }) => {
  const apiRef = useTreeViewApiRef();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const { urlMatchedItemId: urlMatchedItemId } = useNavTreeHrefLUT(data, baseUrl);

  useEffect(() => {
    if (urlMatchedItemId) {
      const itemsToExpand = getSelfAndAllAncestorIds(urlMatchedItemId, data);
      setExpandedItems(items => [...new Set([...items, ...itemsToExpand])]);
      setSelectedItemId(urlMatchedItemId);
    }
  }, [urlMatchedItemId, data]);

  const handleItemExpansionToggle = useCallback(
    (event: SyntheticEvent<Element, Event>, itemId: string, isExpanded: boolean) => {
      const nativeEvent = event.nativeEvent as PointerEvent | KeyboardEvent;

      let itemsToInteract = [itemId];

      if (nativeEvent.ctrlKey) {
        itemsToInteract = getSelfAndAllDescendantIds(apiRef, itemId) ?? [];
      }

      const res = isExpanded
        ? expandedItems.concat(itemsToInteract)
        : expandedItems.filter(i => !itemsToInteract.includes(i));

      setExpandedItems(res);
    },
    [expandedItems, apiRef],
  );

  const handleCollapseAllClick = useCallback(
    (itemId: string) => {
      const itemsToCollapse = getSelfAndAllDescendantIds(apiRef, itemId);
      setExpandedItems(items => items.filter(i => !itemsToCollapse.includes(i)));
    },
    [apiRef],
  );

  const handleExpandAllClick = useCallback(
    (itemId: string) => {
      const itemsToExpand = getSelfAndAllDescendantIds(apiRef, itemId);
      setExpandedItems(items => items.concat(itemsToExpand));
    },
    [apiRef],
  );

  if (isLoading) {
    return (
      <>
        <Skeleton variant={'text'} width={'90%'} />
        <Skeleton variant={'text'} width={'90%'} />
        <Skeleton variant={'text'} width={'90%'} />
      </>
    );
  }

  return (
    <TreeView
      items={data}
      ref={apiRef}
      expandedItems={expandedItems}
      onItemExpansionToggle={handleItemExpansionToggle}
      selectedItems={selectedItemId}
      onSelectedItemsChange={(_, id) => setSelectedItemId(id)}
      slots={{
        item: NavTreeItem,
      }}
      slotProps={{
        item: {
          onCollapseAll: handleCollapseAllClick,
          onExpandAll: handleExpandAllClick,
        } as Partial<TreeItemProps>,
      }}
    />
  );
};
