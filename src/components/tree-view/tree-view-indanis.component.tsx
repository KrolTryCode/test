import {
  TreeView as TreeViewComponent,
  TreeViewApiType,
  TreeViewProps,
} from '@pspod/ui-components';
import { ForwardedRef, forwardRef } from 'react';

import { NavTreeItem } from '~/components/tree/nav-tree/item/nav-tree-item.component';

export const TreeViewIndanis = forwardRef(function TreeView(
  { slots, ...props }: TreeViewProps,
  parentRef: ForwardedRef<TreeViewApiType | undefined>,
) {
  return <TreeViewComponent slots={{ ...slots, item: NavTreeItem }} {...props} ref={parentRef} />;
});
