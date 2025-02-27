import { MarkUnreadChatAlt } from '@mui/icons-material';
import { GridCheckCircleIcon, GridRowSelectionModel } from '@mui/x-data-grid-premium';
import { Button } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Notification } from '~/api/utils/api-requests';

interface MarkAsReadUnreadButtonProps {
  items: Notification[];
  selectedIds: GridRowSelectionModel;
  onClick: (hasUnreadNotifications: boolean) => void;
}

export const MarkAsReadUnreadButton: FC<MarkAsReadUnreadButtonProps> = ({
  items,
  selectedIds,
  onClick,
}) => {
  const { t } = useTranslation();

  const hasUnreadNotifications = useMemo(() => {
    return selectedIds.some(id => {
      const item = items.find(item => item.id === id);
      return !item?.isChecked;
    });
  }, [items, selectedIds]);

  return (
    <Button
      color={'primary'}
      variant={'text'}
      onClick={() => onClick(hasUnreadNotifications)}
      disabled={selectedIds.length === 0}
      icon={hasUnreadNotifications ? <GridCheckCircleIcon /> : <MarkUnreadChatAlt />}
    >
      {t(`NOTIFICATIONS.${hasUnreadNotifications ? 'IS_READ' : 'NOT_READ'}`)}
    </Button>
  );
};
