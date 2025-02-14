import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { getProjectNodesByParentQueryOptions } from '~/api/queries/projects/get-project-nodes-by-parent.query';
import { ProjectNodeType } from '~/api/utils/api-requests';

import { GroupSelectTreeItem } from './group-select-tree-item.component';
import { _GroupSelectContainer } from './group-select-tree.styled';

export interface GroupSelectTreeProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const GroupSelectTree: FC<GroupSelectTreeProps> = ({ value, onChange = () => void 0 }) => {
  const { t } = useTranslation();

  const { data: groups = [] } = useQuery(
    getProjectNodesByParentQueryOptions(undefined, {
      select(data) {
        return data.filter(node => node.type === ProjectNodeType.Group);
      },
    }),
  );

  return (
    <_GroupSelectContainer>
      <GroupSelectTreeItem
        hasChildren={false}
        label={t('COMMON.NO_PARENT')}
        id={''}
        onSelect={onChange}
        selectedId={value}
      />
      {groups.map(({ id, name, hasChildren }) => (
        <GroupSelectTreeItem
          key={id}
          hasChildren={hasChildren ?? false}
          label={name}
          id={id}
          onSelect={onChange}
          selectedId={value}
        />
      ))}
    </_GroupSelectContainer>
  );
};
