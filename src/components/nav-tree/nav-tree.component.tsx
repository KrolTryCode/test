import { useTreeViewApiRef } from '@mui/x-tree-view';
import { FC, useEffect, useMemo, useState } from 'react';

import { NavTreeSkeleton } from '~/components/nav-tree/nav-tree-skeleton.component';
import { useNavTreeToggle } from '~/components/nav-tree/use-nav-tree-toggle.hook';
import { TreeView } from '~/ui-components/tree-view/tree-view.component';
import { getSelfAndAllAncestorIds } from '~/ui-components/tree-view/tree-view.utils';

import { NavTreeItemProps, NavTreeProps } from './nav-tree.type';
import { useNavTreeHrefLUT } from './use-nav-tree-href-lut.hook';

export const NavTree: FC<NavTreeProps> = props => {
  const { isLoading = false, data, baseUrl, menuItems, slots } = props;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const apiRef = useTreeViewApiRef();

  const {
    expandedItems,
    setExpandedItems,
    handleExpandAllClick,
    handleCollapseAllClick,
    handleItemExpansionToggle,
  } = useNavTreeToggle(apiRef);

  const { urlMatchedItemId } = useNavTreeHrefLUT(data, baseUrl);

  useEffect(() => {
    if (urlMatchedItemId) {
      const itemsToExpand = getSelfAndAllAncestorIds(urlMatchedItemId, data);
      setExpandedItems(items => [...new Set([...items, ...itemsToExpand])]);
      setSelectedItemId(urlMatchedItemId);
    }
  }, [urlMatchedItemId, data, setExpandedItems]);

  const slotProps = useMemo(() => {
    return {
      item: {
        onCollapseAll: handleCollapseAllClick,
        onExpandAll: handleExpandAllClick,
        menuItems,
        selectedItemId,
      } as NavTreeItemProps,
    };
  }, [handleCollapseAllClick, handleExpandAllClick, menuItems, selectedItemId]);

  if (isLoading) {
    return <NavTreeSkeleton />;
  }

  return (
    <TreeView
      ref={apiRef}
      items={data}
      slots={slots}
      slotProps={slotProps}
      expandedItems={expandedItems}
      selectedItems={selectedItemId}
      onItemExpansionToggle={handleItemExpansionToggle}
      onSelectedItemsChange={(_, id) => setSelectedItemId(id)}
    />
  );
};
