import { Folder, TableChart } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

import { ContentNodeType } from '~/api/utils/api-requests';

export const isFolderType = (itemType: ContentNodeType | undefined) =>
  itemType === ContentNodeType.Directory;

const ICON_PROPS: SvgIconProps = { color: 'primary', sx: { marginRight: 0.5 } };

export const renderItemIcon = (itemType: ContentNodeType | undefined) => {
  if (isFolderType(itemType)) {
    return <Folder {...ICON_PROPS} />;
  } else {
    return <TableChart {...ICON_PROPS} />;
  }
};
