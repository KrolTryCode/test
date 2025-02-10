import { ChevronRight, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { Button, Preloader } from '@pspod/ui-components';
import { useParams } from '@tanstack/react-router';
import { FC, useState } from 'react';

import { useGetContentNodesByParent } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { ContentNodeType } from '~/api/utils/api-requests';
import { isFolderType, renderItemIcon } from '~/components/tree/nav-tree/nav-tree.utils';
import { NodesTreeItemProps } from '~/components/tree/tree.type';
import { useDropdownMenuItems } from '~/components/tree/use-dropdown-menu-items.hook';

import { ItemDropdownMenu } from './item-dropdown-menu.component';
import {
  _ProjectTreeItemContainer,
  _ToggleButtonContainer,
  _TreeNodeLink,
} from './nodes-tree-item.styled';

export const NodesTreeItem: FC<NodesTreeItemProps> = ({
  contentNode,
  onSelection,
  selectedId,
  hideDropdown = false,
  disableLinks = false,
  showOnlyFolders = false,
}) => {
  const { projectId = '' } = useParams({ strict: false });
  const { menuItems } = useDropdownMenuItems();

  const [isOpened, setIsOpened] = useState(false);

  const { data: childNodes = [], isLoading } = useGetContentNodesByParent(
    projectId,
    contentNode.id,
    {
      enabled: contentNode.hasChildren && isOpened,
      select: data => {
        return showOnlyFolders
          ? data.filter(item => item.type === ContentNodeType.Directory)
          : data;
      },
    },
  );

  return (
    <_ProjectTreeItemContainer>
      <Stack
        direction={'row'}
        alignItems={'center'}
        flex={1}
        sx={theme => ({
          backgroundColor: selectedId === contentNode.id ? theme.palette.grey['200'] : '',
        })}
      >
        <Stack direction={'row'} alignItems={'center'} flex={1}>
          <_ToggleButtonContainer>
            <Button
              hidden={!contentNode.hasChildren}
              variant={'text'}
              size={'small'}
              color={'primary'}
              onClick={() => setIsOpened(isOpened => !isOpened)}
            >
              {isOpened ? <KeyboardArrowDown /> : <ChevronRight />}
            </Button>
          </_ToggleButtonContainer>
          <Box
            display={'flex'}
            flex={1}
            onClick={() => onSelection?.(contentNode.id)}
            onDoubleClick={() => onSelection?.('')}
          >
            {renderItemIcon(contentNode.type)}
            <Stack>
              <_TreeNodeLink
                disabled={disableLinks}
                to={
                  isFolderType(contentNode.type)
                    ? `/projects/project/${projectId}/tables/folders/${contentNode.id}`
                    : `/projects/project/${projectId}/tables/${contentNode.id}/structure`
                }
              >
                {contentNode.name}
              </_TreeNodeLink>
            </Stack>
          </Box>
        </Stack>
        {/* TODO https://tracker.yandex.ru/FE-117 */}
        {!hideDropdown && (
          <ItemDropdownMenu
            item={contentNode}
            menuItems={menuItems}
            onCollapseAll={() => void 0}
            onExpandAll={() => void 0}
          />
        )}
      </Stack>

      {isOpened && (
        <Stack marginLeft={5}>
          {isLoading ? (
            <Preloader />
          ) : (
            childNodes.map(node => (
              <NodesTreeItem
                key={node.id}
                contentNode={{ ...node, parentId: node.id }}
                selectedId={selectedId}
                onSelection={onSelection}
                hideDropdown={hideDropdown}
                disableLinks={disableLinks}
                showOnlyFolders={showOnlyFolders}
              />
            ))
          )}
        </Stack>
      )}
    </_ProjectTreeItemContainer>
  );
};
