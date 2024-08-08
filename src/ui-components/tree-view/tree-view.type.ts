import { RichTreeViewProps } from '@mui/x-tree-view';
import { UseTreeViewFocusPublicAPI } from '@mui/x-tree-view/internals/plugins/useTreeViewFocus/useTreeViewFocus.types';
import { UseTreeViewItemsPublicAPI } from '@mui/x-tree-view/internals/plugins/useTreeViewItems/useTreeViewItems.types';

export interface TreeViewItemData {
  id: string;
  label: string;
  children?: TreeViewItemData[];
}

export type TreeViewApiType = UseTreeViewItemsPublicAPI<TreeViewItemData> &
  UseTreeViewFocusPublicAPI;

export interface TreeViewProps<
  R extends Record<string, any> = Record<string, any>,
  Multiple extends boolean | undefined = undefined,
> extends Omit<RichTreeViewProps<R, Multiple>, 'apiRef'> {}
