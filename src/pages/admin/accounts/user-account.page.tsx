import { Typography, Stack } from '@mui/material';
import { Avatar, Button } from '@pspod/ui-components';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetUserQuery } from '~/api/queries/users/get-user.query';
import { ProfileForm } from '~/pages/profile/profile-form.component';
import { UpdateProfileForm } from '~/pages/profile/profile-form.schema';
import { useTitleContext } from '~/routing/page-title.context';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId ?? '', {
    enabled: !!userId,
  });
  const { setEntityTitle } = useTitleContext();

  useEffect(() => {
    if (user?.firstName && user.lastName) {
      setEntityTitle(user.firstName + ' ' + user.lastName);
    }
    return () => {
      setEntityTitle('');
    };
  }, [user, setEntityTitle]);

  const onSubmit = (formData: UpdateProfileForm) => {
    // eslint-disable-next-line no-console
    console.table(formData);
  };

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('USER.LABEL')} {user?.firstName} {user?.lastName}
      </Typography>
      <Stack direction={'row'} gap={10}>
        <Stack gap={6}>
          <Avatar alt={t('USER.PHOTO')} size={'large'} />
          <Button disabled>{t('BUTTON.CHANGE', { type: '$t(USER.PHOTO_SHORT)' })}</Button>
        </Stack>
        <ProfileForm
          data={user as UpdateProfileForm}
          onSubmit={onSubmit}
          isLoading={isUserLoading}
        />
      </Stack>
    </>
  );
};

export default Profile;
