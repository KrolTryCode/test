import { MoreVert as ShowMoreIcon } from '@mui/icons-material';
import { MenuItem, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { TreeViewBaseItem } from '@mui/x-tree-view';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { unstable_useTreeItem2 as useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import { forwardRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownMenu } from '~/ui-components/dropdown-menu/dropdown-menu.component';

import { StyledLink, StyledTreeItemLabel } from './nav-tree.style';
import { NavTreeItemProps } from './nav-tree.type';

export const NavTreeItem = forwardRef(function NavTreeItem(
  props: NavTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, onCollapseAll, onExpandAll, ...other } = props;
  const { t } = useTranslation();

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
    return publicAPI.getItem(itemId) as TreeViewBaseItem & { href?: string };
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
              {item.href ? <StyledLink to={item.href}>{label}</StyledLink> : label}
            </StyledTreeItemLabel>
            <Box
              className={'dropdown-menu'}
              onClick={event => {
                event.stopPropagation();
              }}
            >
              {item.children && (
                <DropdownMenu
                  buttonColor={'secondary'}
                  buttonContent={<ShowMoreIcon />}
                  showArrow={false}
                  buttonSize={'small'}
                >
                  <MenuItem onClick={() => onCollapseAll?.(item.id)}>
                    {t('BUTTON.HIDE_ALL')}
                  </MenuItem>
                  <MenuItem onClick={() => onExpandAll?.(item.id)}>
                    {t('BUTTON.EXPAND_ALL')}
                  </MenuItem>
                </DropdownMenu>
              )}
            </Box>
          </Stack>
        </TreeItem2Content>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});
