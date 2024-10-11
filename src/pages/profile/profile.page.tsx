import { Typography, Stack } from '@mui/material';
import { Button, Avatar } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCurrentUserQuery } from '~/api/queries/users/get-current-user.query';

import { ProfileForm } from './profile-form.component';
import { UpdateProfileForm } from './profile-form.schema';

const Profile: FC = () => {
  const { t } = useTranslation();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  const onSubmit = (formData: UpdateProfileForm) => {
    // eslint-disable-next-line no-console
    console.table(formData);
  };

  return (
    <>
      <Typography variant={'h3'} component={'h2'}>
        {t('USER.LABEL')}
      </Typography>
      <Stack direction={'row'} gap={10}>
        <Stack gap={6}>
          <Avatar alt={t('USER.PHOTO')} size={'large'} />
          <Button disabled>{t('ACTION.CHANGE', { type: '$t(USER.PHOTO_SHORT)' })}</Button>
        </Stack>

        <ProfileForm
          data={currentUser?.user as UpdateProfileForm}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isCurrent
        />
      </Stack>
    </>
  );
};

export default Profile;
