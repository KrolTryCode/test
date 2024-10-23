import { Typography, Stack } from '@mui/material';
import { Avatar, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetUserQuery } from '~/api/queries/users/get-user.query';
import { ProfileForm } from '~/pages/profile/profile-form.component';
import { usePageTitle } from '~/utils/hooks/use-page-title';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId ?? '', {
    enabled: !!userId,
  });

  usePageTitle(user?.firstName + ' ' + user?.lastName);

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('USER.LABEL')} {user?.firstName} {user?.lastName}
      </Typography>
      <Stack direction={'row'} gap={10}>
        <Stack gap={6}>
          <Avatar alt={t('USER.PHOTO')} size={'large'} />
        </Stack>
        <ProfileForm data={user} userId={userId ?? ''} isLoading={isUserLoading} />
      </Stack>
    </>
  );
};

export default Profile;
