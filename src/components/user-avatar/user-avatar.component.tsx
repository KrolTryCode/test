import { CircularProgress } from '@mui/material';
import { Avatar } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetImageQuery } from '~/api/queries/files/get-image.query';
import { useGetUserAvatarIdQuery } from '~/api/queries/users/get-active-user-avatar-id.query';

import { getFullName } from '../user-profile/user-profile.utils';

// todo: get AvatarProps form ui-components
interface UserAvatarProps {
  userId: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
  size?: 'small' | 'medium' | 'large' | number;
  color?: 'secondary' | 'primary';
  isLoading?: boolean;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  userId,
  firstName,
  lastName,
  surName,
  isLoading = false,
  size = 'small',
  color = 'primary',
}) => {
  const { t } = useTranslation();
  const { data: avatarId = '', isLoading: isAvatarIdLoading } = useGetUserAvatarIdQuery(userId, {
    enabled: !!userId,
  });
  const { data: avatar, isLoading: isAvatarLoading } = useGetImageQuery(avatarId, {
    enabled: !!avatarId,
  });

  const fullName = getFullName(firstName, lastName, surName);
  let userInitialsFallback = '';
  if (!avatar) {
    userInitialsFallback += firstName?.charAt(0) ?? '';
    userInitialsFallback += lastName?.charAt(0) ?? '';
  }

  const img = useMemo(() => {
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([avatar as string]));
    return img;
  }, [avatar]);

  return (
    <Avatar
      size={size}
      withIcon={false}
      color={color}
      src={avatar ? img?.src : undefined}
      alt={fullName ?? t('USER.PHOTO')}
      title={fullName ?? t('USER.PHOTO')}
    >
      {isAvatarIdLoading || isAvatarLoading || isLoading ? (
        <CircularProgress size={'inherit'} color={'secondary'} />
      ) : (
        userInitialsFallback.toUpperCase()
      )}
    </Avatar>
  );
};
