import { ContentNodeType, ProjectNodeType } from '~/api/utils/api-requests';
import { NavTreeItemType } from '~/components/nav-tree/nav-tree.type';

export const isFolderType = (itemType: NavTreeItemType | undefined) =>
  itemType === ContentNodeType.Directory || itemType === ProjectNodeType.Group;
