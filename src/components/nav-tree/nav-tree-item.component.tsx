import { Folder, MoreVert as ShowMoreIcon } from '@mui/icons-material';
import { MenuItem, Stack } from '@mui/material';
import Box from '@mui/material/Box';
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
import { useTranslation } from 'react-i18next';

import { ContentNodeTypeEnum } from '~/api/utils/api-requests';
import { DropdownMenu } from '~/ui-components/dropdown-menu/dropdown-menu.component';

import { StyledLink, StyledTreeItemLabel } from './nav-tree.style';
import { NavTreeItemData, NavTreeItemProps } from './nav-tree.type';

export const NavTreeItem = forwardRef(function NavTreeItem(
  props: NavTreeItemProps,
  ref: Ref<HTMLLIElement>,
) {
  const { t } = useTranslation();
  const { id, itemId, label, disabled, children, menuItems, onCollapseAll, onExpandAll, ...other } =
    props;

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

  return (
    // Странная ошибка с типами при билде
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
              {item.type === ContentNodeTypeEnum.Directory && (
                <Folder color={'primary'} sx={{ marginRight: 0.5 }} />
              )}
              {item.href ? <StyledLink to={item.href}>{label}</StyledLink> : label}
            </StyledTreeItemLabel>
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
                    {t('BUTTON.HIDE_ALL')}
                  </MenuItem>,
                  <MenuItem key={'expand'} onClick={() => onExpandAll?.(item.id)}>
                    {t('BUTTON.EXPAND_ALL')}
                  </MenuItem>,
                ]}

                {menuItems?.map(({ label, onClick }) => (
                  <MenuItem key={label} onClick={() => onClick(item.id)}>
                    {label}
                  </MenuItem>
                ))}
              </DropdownMenu>
            </Box>
          </Stack>
        </TreeItem2Content>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});
