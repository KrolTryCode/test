import { PhotoCamera as CameraIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { confirmDeletionModal, notifyError, notifySuccess } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateAvatarMutation } from '~/api/queries/users/create-user-avatar.mutation';
import { useDeleteUserAvatarMutation } from '~/api/queries/users/delete-user-avatar.mutation';
import { useGetUserAvatarIdQuery } from '~/api/queries/users/get-active-user-avatar-id.query';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { uploadFiles } from '~/utils/files';
import { validExtensions } from '~/utils/files/upload-files';
import { showErrorMessage } from '~/utils/show-error-message';

import { StyledAvatarContainer, StyledBackdrop } from './profile-avatar.style';

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

  const handleUploadAvatar = async () => {
    const fileList = await uploadFiles({ isMultiple: false, fileType: 'image' });
    const file = fileList[0];

    const ext = file.name.split('.').slice(-1)[0].toLowerCase();
    if (!validExtensions['image'].some(type => type.endsWith(ext))) {
      notifyError(`${t('FILES.ERROR.WRONG_EXTENSION')}: ${ext}`);
      return;
    }

    if (file) {
      await saveAvatar({ file });
    }
  };

  const handleDeleteAvatar = () =>
    confirmDeletionModal({ title: t('MESSAGE.CONFIRM_CONTINUE_DELETE'), onOk: deleteAvatar });

  return (
    <StyledAvatarContainer className={'profile-avatar'}>
      <UserAvatar
        size={'large'}
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        surName={surName}
        isLoading={isUploading}
      />
      <StyledBackdrop gap={1}>
        <IconButton
          color={'inherit'}
          title={t('ACTION.LOAD', { type: t('USER.PHOTO').toLowerCase() })}
          onClick={handleUploadAvatar}
        >
          <CameraIcon fontSize={'large'} />
        </IconButton>
        {!!avatarId && (
          <IconButton
            color={'error'}
            title={t('ACTION.DELETE', { type: t('USER.PHOTO').toLowerCase() })}
            onClick={handleDeleteAvatar}
          >
            <DeleteIcon fontSize={'large'} />
          </IconButton>
        )}
      </StyledBackdrop>
    </StyledAvatarContainer>
  );
};
