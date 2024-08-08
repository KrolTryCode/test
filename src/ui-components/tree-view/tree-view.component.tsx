import { ChevronRight as ExpandIcon, ExpandMore as CollapseIcon } from '@mui/icons-material';
import { RichTreeView, useTreeViewApiRef } from '@mui/x-tree-view';
import { forwardRef, useImperativeHandle } from 'react';

import { TreeViewApiType, TreeViewProps } from './tree-view.type';

export const TreeView = forwardRef(function TreeView(
  { slots, ...props }: TreeViewProps,
  parentRef: React.ForwardedRef<TreeViewApiType | undefined>,
) {
  const apiRef = useTreeViewApiRef();

  useImperativeHandle(parentRef, () => apiRef.current);

  return (
    <RichTreeView
      slots={{
        expandIcon: ExpandIcon,
        collapseIcon: CollapseIcon,
        ...slots,
      }}
      {...props}
      apiRef={apiRef}
    />
  );
});
