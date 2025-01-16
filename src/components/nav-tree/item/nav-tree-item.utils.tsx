import { Folder, TableChart } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

import { ContentNodeType, ProjectNodeType } from '~/api/utils/api-requests';
import { NavTreeItemType } from '~/components/nav-tree/nav-tree.type';

export const isFolderType = (itemType: NavTreeItemType | undefined) =>
  itemType === ContentNodeType.Directory || itemType === ProjectNodeType.Group;

export const renderItemIcon = (itemType: NavTreeItemType | undefined) => {
  const iconProps: SvgIconProps = { color: 'primary', sx: { marginRight: 0.5 } };
  if (isFolderType(itemType)) {
    return <Folder {...iconProps} />;
  } else {
    return <TableChart {...iconProps} />;
  }
};
