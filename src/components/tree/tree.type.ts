import { ContentNode } from '~/api/utils/api-requests';

interface NodesTreeCommonProps {
  selectedId?: string;
  hideDropdown?: boolean;
  disableLinks?: boolean;
  showOnlyFolders?: boolean;
  onSelection?: (nodeId: string) => void;
}

export interface NodesTreeItemProps extends NodesTreeCommonProps {
  contentNode: ExtendedContentNode;
}

export interface NodesTreeListProps extends NodesTreeCommonProps {
  error?: boolean;
}

export interface ExtendedContentNode extends ContentNode {
  parentId: string;
}
