import { MoreVert as ShowMoreIcon } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { DropdownMenu } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownMenuItem } from '~/components/nav-tree/nav-tree.type';
import { ExtendedContentNode } from '~/pages/_main/projects/project.$projectId/tables.$tableId/tree/nodes-tree.type';

export const ItemDropdownMenu: FC<{
  item: ExtendedContentNode;
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
    <>
      {(filteredMenuItems ?? item.hasChildren) && (
        <Box
          className={'dropdown-menu'}
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <DropdownMenu
            color={'primary'}
            showArrow={false}
            icon={<ShowMoreIcon />}
            buttonSize={'medium'}
          >
            {item.hasChildren && [
              <MenuItem key={'collapse'} onClick={() => onCollapseAll?.(item.id)}>
                {t('ACTION.HIDE_ALL')}
              </MenuItem>,
              <MenuItem key={'expand'} onClick={() => onExpandAll?.(item.id)}>
                {t('ACTION.EXPAND_ALL')}
              </MenuItem>,
            ]}
            {filteredMenuItems?.map(({ label, onClick, color }) => (
              <MenuItem key={label} onClick={() => onClick(item)} color={color}>
                {label}
              </MenuItem>
            ))}
          </DropdownMenu>
        </Box>
      )}
    </>
  );
};
