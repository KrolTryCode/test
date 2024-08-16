import { MutableRefObject, SyntheticEvent, useCallback, useState } from 'react';

import { TreeViewApiType } from '~/ui-components/tree-view/tree-view.type';
import { getSelfAndAllDescendantIds } from '~/ui-components/tree-view/tree-view.utils';

export const useNavTreeToggle = (apiRef: MutableRefObject<TreeViewApiType | undefined>) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
    [apiRef, expandedItems],
  );

  return {
    expandedItems,
    setExpandedItems,
    handleExpandAllClick,
    handleCollapseAllClick,
    handleItemExpansionToggle,
  };
};
