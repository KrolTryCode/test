import { Folder, TableChart } from '@mui/icons-material';
import { Stack, SvgIconProps } from '@mui/material';
import {
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { unstable_useTreeItem2 as useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import { forwardRef, Ref, useMemo } from 'react';

import { ItemDropdownMenu } from '~/components/nav-tree/item/item-dropdown-menu.component';
import { isFolderType } from '~/components/nav-tree/item/nav-tree-item.utils';
import { SelectItemButton } from '~/components/nav-tree/item/select-item-button.component';

import { StyledLink, StyledTreeItemLabel } from '../nav-tree.style';
import { NavTreeItemData, NavTreeItemProps, NavTreeItemType } from '../nav-tree.type';

export const NavTreeItem = forwardRef(function NavTreeItem(
  props: NavTreeItemProps,
  ref: Ref<HTMLLIElement>,
) {
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    menuItems,
    selectedItemId,
    onCollapseAll,
    onExpandAll,
    onHandleSelectEvent,
    hideDropdown = false,
    disableLinks = false,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = useMemo(() => {
    return publicAPI.getItem(itemId) as NavTreeItemData;
  }, [itemId, publicAPI]);

  const renderItemIcon = (itemType: NavTreeItemType | undefined) => {
    const iconProps: SvgIconProps = { color: 'primary', sx: { marginRight: 0.5 } };
    if (isFolderType(itemType)) {
      return <Folder {...iconProps} />;
    } else {
      return <TableChart {...iconProps} />;
    }
  };

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <TreeItem2Content {...getContentProps()}>
          {!!item.children && (
            <TreeItem2IconContainer {...getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </TreeItem2IconContainer>
          )}
          <Stack gap={1} direction={'row'} flexGrow={'1'}>
            <StyledTreeItemLabel {...getLabelProps()}>
              {renderItemIcon(item.type)}
              {item.href && !disableLinks ? <StyledLink to={item.href}>{label}</StyledLink> : label}
              {item.id === selectedItemId && onHandleSelectEvent !== undefined && (
                <SelectItemButton item={item} onHandleSelect={onHandleSelectEvent} />
              )}
            </StyledTreeItemLabel>
            {!hideDropdown && (
              <ItemDropdownMenu
                item={item}
                menuItems={menuItems}
                onCollapseAll={onCollapseAll}
                onExpandAll={onExpandAll}
              />
            )}
          </Stack>
        </TreeItem2Content>
        {children && (
          <TreeItem2GroupTransition
            sx={theme => ({ paddingLeft: theme.spacing(4) })}
            {...getGroupTransitionProps()}
          />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});
