import { ContentNodeTypeEnum, ProjectSubtreeTypeEnum } from '~/api/utils/api-requests';
import { NavTreeItemType } from '~/components/nav-tree/nav-tree.type';

export const isFolderType = (itemType: NavTreeItemType | undefined) =>
  itemType === ContentNodeTypeEnum.Directory || itemType === ProjectSubtreeTypeEnum.Group;
