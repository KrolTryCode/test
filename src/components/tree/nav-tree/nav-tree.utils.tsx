import { Folder, TableChart } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

import { ContentNodeType } from '~/api/utils/api-requests';

export const isFolderType = (itemType: ContentNodeType | undefined) =>
  itemType === ContentNodeType.Directory;

export const renderItemIcon = (itemType: ContentNodeType | undefined) => {
  const iconProps: SvgIconProps = { color: 'primary', sx: { marginRight: 0.5 } };
  if (isFolderType(itemType)) {
    return <Folder {...iconProps} />;
  } else {
    return <TableChart {...iconProps} />;
  }
};
