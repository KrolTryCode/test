import { ChevronRight as ChevronRightIcon, Folder } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import { getProjectNodesByParentQueryOptions } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { ProjectNodeType } from '~/api/utils/api-requests';

import {
  _GroupSelectElementContainer,
  _GroupSelectElementTogglerContainer,
  _ChildrenContainer,
  _GroupSelectElementLabel,
} from './group-select-tree.styled';

export interface GroupSelectTreeItemProps {
  id: string;
  label: string;
  hasChildren: boolean;
  onSelect: (value: string) => void;
  selectedId?: string;
}

export const GroupSelectTreeItem: FC<GroupSelectTreeItemProps> = ({
  id,
  hasChildren,
  label,
  onSelect,
  selectedId,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const { data: children = [] } = useQuery(
    getProjectNodesByParentQueryOptions(id, {
      select(data) {
        if (!id) {
          return [];
        }
        return data.filter(node => node.type === ProjectNodeType.Group);
      },
      enabled: isOpened,
    }),
  );

  const isActive = selectedId === id;

  return (
    <>
      <_GroupSelectElementContainer>
        <_GroupSelectElementTogglerContainer>
          {hasChildren && (
            <ChevronRightIcon
              onClick={() => setIsOpened(isOpened => !isOpened)}
              style={{ transform: `rotate(${isOpened ? 90 : 0}deg)` }}
            />
          )}
        </_GroupSelectElementTogglerContainer>
        <_GroupSelectElementLabel
          onClick={() => onSelect(id)}
          bgcolor={isActive ? 'secondary.light' : 'inherit'}
        >
          {id && <Folder color={'primary'} />}
          {label}
        </_GroupSelectElementLabel>
      </_GroupSelectElementContainer>
      {isOpened && (
        <_ChildrenContainer>
          {children.map(({ id, name, hasChildren }) => (
            <GroupSelectTreeItem
              key={id}
              hasChildren={hasChildren ?? false}
              label={name}
              id={id}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </_ChildrenContainer>
      )}
    </>
  );
};
