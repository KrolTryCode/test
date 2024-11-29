import { Typography, Stack } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCurrentUserQuery } from '~/api/queries/users/get-current-user.query';

import { ProfileAvatar } from './profile-avatar/profile-avatar.component';
import { ProfileForm } from './profile-form.component';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  const userId = currentUser?.user?.id ?? '';

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('USER.LABEL')}
      </Typography>
      <Stack
        gap={6}
        sx={({ breakpoints }) => ({
          flexDirection: 'row',
          [breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'center' },
        })}
      >
        <ProfileAvatar
          userId={userId}
          firstName={currentUser.user?.firstName}
          lastName={currentUser.user?.lastName}
        />
        <ProfileForm data={currentUser?.user} userId={userId} isLoading={isLoading} isCurrent />
      </Stack>
    </>
  );
};

export default Profile;
