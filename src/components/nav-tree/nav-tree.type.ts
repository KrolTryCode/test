import { RichTreeViewSlots, TreeViewBaseItem, UseTreeItem2Parameters } from '@mui/x-tree-view';
import { HTMLAttributes } from 'react';

import { ContentNodeTypeEnum, ContentSubtreeTypeEnum } from '~/api/utils/api-requests';

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
  selectedItemId?: string | undefined;
  onHandleSelectEvent?: (itemId: string) => void;
}

export interface NavTreeItemData extends TreeViewBaseItem {
  href?: string;
  type?: ContentNodeTypeEnum | ContentSubtreeTypeEnum;
}

export interface DropdownMenuItem {
  label: string;
  onClick: (itemId: string) => void;
  entityType?: ContentNodeTypeEnum;
}
