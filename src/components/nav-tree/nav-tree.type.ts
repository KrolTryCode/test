import { RichTreeViewSlots, TreeViewBaseItem, UseTreeItem2Parameters } from '@mui/x-tree-view';
import { Color, Extract } from '@pspod/ui-components/build/_type';
import { HTMLAttributes } from 'react';

import { ContentNodeType, ProjectNodeType } from '~/api/utils/api-requests';

export interface NavTreeProps {
  isLoading?: boolean;
  data: NavTreeItemData[];
  baseUrl: string;
  slots?: RichTreeViewSlots;
  menuItems?: DropdownMenuItem[];
}

export interface NavTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  onCollapseAll?: (itemId: string) => void;
  onExpandAll?: (itemId: string) => void;
  menuItems?: DropdownMenuItem[];
  hideDropdown?: boolean;
  disableLinks?: boolean;
  onHandleSelectEvent?: (itemId: string) => void;
}

export type NavTreeItemType = ContentNodeType | ProjectNodeType;

export interface NavTreeItemData extends TreeViewBaseItem {
  href?: string;
  type?: NavTreeItemType;
  description?: string;
}

export interface DropdownMenuItem {
  label: string;
  onClick: (itemId: string) => void;
  entityType?: NavTreeItemType;
  color?: Extract<Color, 'primary' | 'secondary' | 'error' | 'warning' | 'success'>;
}
