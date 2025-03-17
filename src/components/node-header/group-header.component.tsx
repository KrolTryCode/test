import { DeleteOutline, Edit, Event, People } from '@mui/icons-material';
import { Button } from '@pspod/ui-components';
import { useLocation } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateNodeMenu } from '~/components/create-menu/create-node-menu.component';
import { ButtonLink } from '~/components/implicit-links';
import { NodeHeader } from '~/components/node-header/node-header.component';
import { useNodeActions } from '~/components/node-header/node-header.hook';

export interface ActionButton {
  title: string;
  icon: JSX.Element;
  path: string;
}

interface GroupHeaderProps {
  groupId: string;
}

export const GroupHeader: FC<GroupHeaderProps> = ({ groupId }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const {
    nodeData: groupData,
    isNodeDataLoading: isGroupDataLoading,
    deleteProjectOrGroup,
    updateProjectOrGroup,
  } = useNodeActions(groupId);

  const actionButtons: ActionButton[] = [
    { title: t('NAVIGATION.PARTICIPANTS'), icon: <People />, path: 'participants' },
    { title: t('NAVIGATION.EVENTS'), icon: <Event />, path: 'events' },
  ];

  const renderActions = () => (
    <>
      <Button
        size={'small'}
        color={'primary'}
        title={t('ACTION.EDIT')}
        onClick={() => updateProjectOrGroup(groupData)}
        variant={'text'}
        icon={<Edit />}
      />
      <CreateNodeMenu />
      {actionButtons.map(button => {
        const isActive = pathname.includes(button.path);
        return (
          <ButtonLink
            key={button.path}
            size={'small'}
            color={'primary'}
            title={button.title}
            icon={button.icon}
            variant={isActive ? 'contained' : 'text'}
            to={isActive ? '/projects/group/$groupId' : `/projects/group/$groupId/${button.path}`}
            params={{ groupId }}
          />
        );
      })}
      <Button
        size={'small'}
        color={'error'}
        title={t('ACTION.DELETE')}
        variant={'text'}
        icon={<DeleteOutline />}
        onClick={() => deleteProjectOrGroup(groupData)}
      />
    </>
  );

  return (
    <NodeHeader
      {...groupData}
      isLoading={isGroupDataLoading}
      id={groupId}
      actions={renderActions()}
    >
      {groupData?.name ?? t('TREE.NODE')}
    </NodeHeader>
  );
};
