import { DeleteOutline, Edit, People } from '@mui/icons-material';
import { Button } from '@pspod/ui-components';
import { useLocation } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateNodeMenu } from '~/components/create-menu/create-node-menu.component';
import { ButtonLink } from '~/components/implicit-links';
import { NodeHeader } from '~/components/node-header/node-header.component';
import { useNodeActions } from '~/components/node-header/node-header.hook';

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
      <ButtonLink
        size={'small'}
        color={'primary'}
        title={t('NAVIGATION.PARTICIPANTS')}
        icon={<People />}
        variant={pathname.includes('participants') ? 'contained' : 'text'}
        to={
          pathname.includes('participants')
            ? '/projects/group/$groupId'
            : '/projects/group/$groupId/participants'
        }
        params={{ groupId }}
      />
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
