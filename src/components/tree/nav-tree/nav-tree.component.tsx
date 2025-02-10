import { useTreeViewApiRef } from '@pspod/ui-components';
import { FC, useEffect, useMemo, useState } from 'react';

import { NavTreeSkeleton } from '~/components/tree/nav-tree/nav-tree-skeleton.component';
import { useNavTreeToggle } from '~/components/tree/nav-tree/use-nav-tree-toggle.hook';
import { TreeViewIndanis } from '~/components/tree-view/tree-view-indanis.component';
import { getSelfAndAllAncestorIds } from '~/components/tree-view/tree-view.utils';

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
      } as NavTreeItemProps,
    };
  }, [handleCollapseAllClick, handleExpandAllClick, menuItems]);

  if (isLoading) {
    return <NavTreeSkeleton />;
  }

  return (
    <TreeViewIndanis
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
