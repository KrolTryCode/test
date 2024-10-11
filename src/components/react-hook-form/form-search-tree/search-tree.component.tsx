import { Cancel as CancelIcon } from '@mui/icons-material';
import { ClickAwayListener, OutlinedInput, Typography } from '@mui/material';
import { Button } from '@pspod/ui-components';
import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';

import { NavTreeItemData, NavTreeItemProps } from '~/components/nav-tree/nav-tree.type';
import { PopperWithPaper } from '~/components/popper-with-paper/popper-with-paper.component';
import { TreeViewIndanis } from '~/components/tree-view/tree-view-indanis.component';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';

export interface SearchTreeProps {
  items: NavTreeItemData[];
  noDataText?: string;
  isLoading?: boolean;
  placeholder?: string;
  error: boolean;
  value: string;
  onSelect: (value: string) => void;
  onBlur: () => void;
}

export const SearchTree: FC<SearchTreeProps> = props => {
  const { items, isLoading, value, noDataText, placeholder, error, onSelect, onBlur } = props;
  const { findNode, getParentsIdsList, getAllIds, filterNodes } = useTreeNodesUtils(items);
  const ref = useRef<HTMLInputElement>();
  const [showTree, setShowTree] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue.toLowerCase(), 700);
  const [treeList, setTreeList] = useState<NavTreeItemData[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>('');
  const [expandedNodes, setExpandedNodes] = useState(getParentsIdsList(value));

  useEffect(() => {
    setSearchValue(findNode(value)?.label ?? '');
  }, [findNode, value]);

  useEffect(() => {
    const filteredData = debouncedSearchValue.length ? filterNodes(debouncedSearchValue) : items;
    setTreeList(filteredData);

    if (debouncedSearchValue) {
      setExpandedNodes(getAllIds(filteredData));
    }
  }, [debouncedSearchValue, setTreeList, getAllIds, filterNodes, items]);

  const treeNodeSelectHandler = (_: SyntheticEvent<Element, Event>, itemIds: string | null) => {
    setSelectedItemId(itemIds);
    if (itemIds) {
      setExpandedNodes(prev => {
        const wasSelected = prev.includes(itemIds);
        return wasSelected ? prev.filter(id => id !== itemIds) : [...prev, itemIds];
      });
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event =>
    setSearchValue(event.target.value);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    switch (event.key) {
      case 'Escape': {
        return handleClose();
      }
      case 'Enter': {
        const value = event.currentTarget.value.toLowerCase();
        if (!value) {
          setShowTree(false);
          return handleClear();
        }

        const foundValue = findNode(value);
        if (foundValue) {
          handleSelect(foundValue.id);
        } else {
          event.preventDefault();
        }
        break;
      }
    }
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    handleClose();
  };

  const handleClose = () => {
    setShowTree(false);
    if (selectedItemId === '') {
      handleClear();
    }
    setExpandedNodes(getParentsIdsList(selectedItemId ?? ''));
    setSelectedItemId('');
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
    onBlur();
  };

  const handleClear = () => {
    setSearchValue('');
    onSelect('');
    setExpandedNodes([]);
  };

  return (
    <ClickAwayListener onClickAway={() => showTree && handleClose()}>
      <div>
        <OutlinedInput
          ref={ref}
          fullWidth
          onFocus={() => setShowTree(true)}
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={error}
          placeholder={placeholder}
          endAdornment={
            <Button
              hidden={!searchValue || !showTree}
              size={'small'}
              variant={'text'}
              onClick={handleClear}
              icon={<CancelIcon opacity={0.5} />}
            />
          }
        />

        <PopperWithPaper isOpen={showTree} anchorEl={ref.current} isContentLoading={isLoading}>
          {treeList.length ? (
            <TreeViewIndanis
              items={treeList}
              selectedItems={selectedItemId}
              expandedItems={expandedNodes}
              onSelectedItemsChange={treeNodeSelectHandler}
              slotProps={{
                item: {
                  onHandleSelectEvent: handleSelect,
                  selectedItemId: selectedItemId,
                  hideDropdown: true,
                  disableLinks: true,
                } as NavTreeItemProps,
              }}
            />
          ) : (
            <Typography padding={1} gutterBottom={false}>
              {noDataText}
            </Typography>
          )}
        </PopperWithPaper>
      </div>
    </ClickAwayListener>
  );
};
