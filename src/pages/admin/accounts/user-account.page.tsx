import { Typography, Stack } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetUserQuery } from '~/api/queries/users/get-user.query';
import { selectUserTimezone } from '~/api/selectors/select-user-timezone';
import { getCurrentUserTimezone } from '~/app/user/user.store';
import { UserAvatar } from '~/components/user-avatar/user-avatar.component';
import { ProfileForm } from '~/pages/profile/profile-form.component';
import { usePageTitle } from '~/utils/hooks/use-page-title';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId ?? '', {
    enabled: !!userId,
    select: data => {
      const tz = getCurrentUserTimezone();
      const user = selectUserTimezone(tz, data, ['lastSuccessfulLoginTime', 'createdFrom']);
      return user;
    },
  });

  usePageTitle(user?.firstName + ' ' + user?.lastName);

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('USER.LABEL')} {user?.firstName} {user?.lastName}
      </Typography>
      <Stack
        gap={6}
        sx={({ breakpoints }) => ({
          flexDirection: 'row',
          [breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'center' },
        })}
      >
        <UserAvatar
          size={'large'}
          userId={userId ?? ''}
          firstName={user?.firstName}
          lastName={user?.lastName}
        />
        <ProfileForm data={user} userId={userId ?? ''} isLoading={isUserLoading} />
      </Stack>
    </>
  );
};

export default Profile;
