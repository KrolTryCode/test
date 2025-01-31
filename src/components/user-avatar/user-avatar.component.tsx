import { Avatar, AvatarProps } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetUserAvatarIdQuery } from '~/api/queries/users/get-active-user-avatar-id.query';

import { useGetImage } from '../upload-file/use-get-image.hook';
import { getFullName } from '../user-profile/user-profile.utils';

interface UserAvatarProps extends AvatarProps {
  userId: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
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
  const { image: avatar, isImageLoading: isAvatarLoading } = useGetImage(avatarId);

  const fullName = getFullName(firstName, lastName, surName);
  let userInitialsFallback = '';
  if (!avatarId) {
    userInitialsFallback += firstName?.charAt(0) ?? '';
    userInitialsFallback += lastName?.charAt(0) ?? '';
  }

  return (
    <Avatar
      size={size}
      color={color}
      src={avatar?.src}
      alt={fullName ?? t('USER.PHOTO')}
      title={fullName ?? t('USER.PHOTO')}
      isLoading={isAvatarIdLoading || isAvatarLoading || isLoading}
    >
      {userInitialsFallback.toUpperCase()}
    </Avatar>
  );
};
