import { MoreVert as ShowMoreIcon } from '@mui/icons-material';
import { MenuItem, Box } from '@mui/material';
import { DropdownMenu } from '@pspod/ui-components';
import { FC, useMemo } from 'react';

import { ContentNode, ContentNodeType } from '~/api/utils/api-requests';
import { DropdownMenuItem } from '~/components/trees/tree.type';

interface ProjectContentItemMenuProps {
  item: ContentNode;
  menuItems?: DropdownMenuItem<ContentNodeType>[];
}

export const ProjectContentItemMenu: FC<ProjectContentItemMenuProps> = ({ item, menuItems }) => {
  const filteredMenuItems = useMemo(
    () => menuItems?.filter(menuItem => !menuItem.entityType || menuItem.entityType === item.type),
    [menuItems, item.type],
  );

  if (!filteredMenuItems?.length) {
    return null;
  }

  return (
    <Box
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <DropdownMenu
        showArrow={false}
        icon={<ShowMoreIcon />}
        buttonSize={'small'}
        //@ts-expect-error narrow types
        buttonColor={'text.primary'}
      >
        {filteredMenuItems?.map(({ label, onClick, color }) => (
          <MenuItem key={label} onClick={() => onClick(item)} color={color}>
            {label}
          </MenuItem>
        ))}
      </DropdownMenu>
    </Box>
  );
};
