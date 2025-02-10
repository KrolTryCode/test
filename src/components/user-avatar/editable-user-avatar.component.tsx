import { confirmDeletionModal, notifySuccess, UploadImage } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateAvatarMutation } from '~/api/queries/users/create-user-avatar.mutation';
import { useDeleteUserAvatarMutation } from '~/api/queries/users/delete-user-avatar.mutation';
import { useGetUserAvatarIdQuery } from '~/api/queries/users/get-active-user-avatar-id.query';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { fileTypeExtensions, validateSelectedFiles } from '~/utils/files/validate-files';
import { showErrorMessage } from '~/utils/show-error-message';

interface ProfileAvatarProps {
  userId: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
}

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ userId, firstName, lastName, surName }) => {
  const { t } = useTranslation();

  const { data: avatarId = '' } = useGetUserAvatarIdQuery(userId, {
    enabled: !!userId,
  });

  const { mutateAsync: saveAvatar, isPending: isUploading } = useCreateAvatarMutation(userId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
  });

  const { mutate: deleteAvatar } = useDeleteUserAvatarMutation(userId, {
    onSuccess: () => notifySuccess(t('MESSAGE.DELETION_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.DELETION_FAILED'),
  });

  const handleUploadAvatar = async (file: File) => {
    const isValid = !!validateSelectedFiles([file], 'image').length;
    if (isValid) {
      await saveAvatar({ file });
    }
  };

  const handleDeleteAvatar = () =>
    confirmDeletionModal({ title: t('MESSAGE.CONFIRM_CONTINUE_DELETE'), onOk: deleteAvatar });

  return (
    <UploadImage
      className={'profile-avatar'}
      accept={fileTypeExtensions['image'].join(', ')}
      onSelect={handleUploadAvatar}
      onDelete={avatarId ? handleDeleteAvatar : undefined}
      alt={t('USER.PHOTO')}
      variant={'circular'}
      CustomAvatar={
        <UserAvatar
          size={150}
          userId={userId}
          firstName={firstName}
          lastName={lastName}
          surName={surName}
          isLoading={isUploading}
        />
      }
    />
  );
};
