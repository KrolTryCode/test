import { Typography, Stack } from '@mui/material';
import { Button, Avatar } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCurrentUserQuery } from '~/api/queries/users/get-current-user.query';

import { ProfileForm } from './profile-form.component';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('USER.LABEL')}
      </Typography>
      <Stack direction={'row'} gap={10}>
        <Stack gap={6}>
          <Avatar alt={t('USER.PHOTO')} size={'large'} />
        </Stack>
        <ProfileForm
          data={currentUser?.user}
          userId={currentUser?.user?.id ?? ''}
          isLoading={isLoading}
          isCurrent
        />
      </Stack>
    </>
  );
};

export default Profile;
