import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type ShowOnlyUnreadNotificationsProps = {
  isOnlyUnreadShown: boolean;
  handleChange: () => void;
};

export const ShowOnlyUnreadNotifications: FC<ShowOnlyUnreadNotificationsProps> = ({
  isOnlyUnreadShown,
  handleChange,
}) => {
  const { t } = useTranslation();
  return (
    <Button
      icon={isOnlyUnreadShown ? <CheckBox /> : <CheckBoxOutlineBlank />}
      onClick={handleChange}
      title={t('NOTIFICATIONS.SHOW_UNREAD_ONLY')}
      color={'primary'}
      variant={'text'}
    >
      {t('NOTIFICATIONS.SHOW_UNREAD_ONLY')}
    </Button>
  );
};
