import { ChevronRight as ExpandIcon, ExpandMore as CollapseIcon } from '@mui/icons-material';
import { RichTreeView, useTreeViewApiRef } from '@mui/x-tree-view';
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';

import { NavTreeItem } from '~/components/nav-tree/item/nav-tree-item.component';

import { TreeViewApiType, TreeViewProps } from './tree-view.type';

export const TreeView = forwardRef(function TreeView(
  { slots, ...props }: TreeViewProps,
  parentRef: ForwardedRef<TreeViewApiType | undefined>,
) {
  const apiRef = useTreeViewApiRef();

  useImperativeHandle(parentRef, () => apiRef.current);

  return (
    <RichTreeView
      slots={{ expandIcon: ExpandIcon, collapseIcon: CollapseIcon, item: NavTreeItem, ...slots }}
      {...props}
      apiRef={apiRef}
    />
  );
});
