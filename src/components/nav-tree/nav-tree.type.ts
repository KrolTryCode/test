import { TreeViewBaseItem, UseTreeItem2Parameters } from '@mui/x-tree-view';

export interface NavTreeProps {
  isLoading?: boolean;
  data: NavTreeItemData[];
  baseUrl: string;
}

export interface NavTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  onCollapseAll?: (itemId: string) => void;
  onExpandAll?: (itemId: string) => void;
}

export interface NavTreeItemData extends TreeViewBaseItem {
  href?: string;
}
