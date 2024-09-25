import { MoreVert as ShowMoreIcon } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownMenuItem, NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { DropdownMenu } from '~/ui-components/dropdown-menu/dropdown-menu.component';

export const ItemDropdownMenu: FC<{
  item: NavTreeItemData;
  onCollapseAll?: (itemId: string) => void;
  onExpandAll?: (itemId: string) => void;
  menuItems?: DropdownMenuItem[];
}> = ({ onCollapseAll, onExpandAll, item, menuItems }) => {
  const { t } = useTranslation();
  const filteredMenuItems = useMemo(
    () => menuItems?.filter(it => !it.entityType || it.entityType === item.type),
    [menuItems, item.type],
  );

  return (
    <Box
      className={'dropdown-menu'}
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <DropdownMenu
        buttonColor={'secondary'}
        buttonContent={<ShowMoreIcon />}
        showArrow={false}
        buttonSize={'small'}
      >
        {item.children && [
          <MenuItem key={'collapse'} onClick={() => onCollapseAll?.(item.id)}>
            {t('ACTION.HIDE_ALL')}
          </MenuItem>,
          <MenuItem key={'expand'} onClick={() => onExpandAll?.(item.id)}>
            {t('ACTION.EXPAND_ALL')}
          </MenuItem>,
        ]}
        {filteredMenuItems?.map(({ label, onClick }) => (
          <MenuItem key={label} onClick={() => onClick(item.id)}>
            {label}
          </MenuItem>
        ))}
      </DropdownMenu>
    </Box>
  );
};
