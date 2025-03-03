import { TreeViewBaseItem, UseTreeItem2Parameters } from '@mui/x-tree-view';
import { Color } from '@pspod/ui-components/build/_type';
import { HTMLAttributes } from 'react';

import { ContentNode } from '~/api/utils/api-requests';

interface NodesTreeCommonProps {
  selectedId?: string;
  hideDropdown?: boolean;
  disableLinks?: boolean;
  showOnlyFolders?: boolean;
  onSelection?: (nodeId: string) => void;
}

export interface NodesTreeItemProps extends NodesTreeCommonProps {
  contentNode: ContentNode;
}

export interface NodesTreeListProps extends NodesTreeCommonProps {
  error?: boolean;
}

export interface DropdownMenuItem<ItemEntityType = unknown> {
  label: string;
  onClick: (item: ContentNode) => void;
  entityType?: ItemEntityType;
  color?: Extract<Color, 'primary' | 'secondary' | 'error' | 'warning' | 'success'>;
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

export interface NavTreeItemData<ItemEntityType = unknown> extends TreeViewBaseItem {
  href?: string;
  type?: ItemEntityType;
  description?: string;
}
