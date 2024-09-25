import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Stack } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { useGetCurrentUserQuery } from '~/api/queries/users/get-current-user.query';
import { useGetUserQuery } from '~/api/queries/users/get-user.query';
import { useTitleContext } from '~/routing/page-title.context';
import { Avatar } from '~/ui-components/avatar/avatar.component';
import { Button } from '~/ui-components/button/button.component';
import { Form, FormButtons } from '~/ui-components/form';
import { adminRole } from '~/utils/configuration/constants-roles';
import { adminPath } from '~/utils/configuration/routes-paths';

import { Contacts } from './contacts/contacts.component';
import { PersonalData } from './personal-data/personal-data.component';
import { UpdateProfileForm, defaultValues, getSchema } from './profile.schema';
import { SystemData } from './system-data/system-data.component';
import { useChangePassword } from './use-change-password.hook';

const Profile: FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ userId?: string }>();
  const location = useLocation();
  const { setEntityTitle } = useTitleContext();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  const isAdminUser = currentUser?.permissions?.includes(adminRole);
  const isAdminPage = location.pathname.includes(adminPath) && isAdminUser;
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(params?.userId ?? '', {
    enabled: !!params.userId && isAdminPage,
  });

  const { onChangePassword } = useChangePassword(user?.email ?? '');

  useEffect(() => {
    if (user?.firstName && user.lastName) {
      setEntityTitle(user.firstName + ' ' + user.lastName);
    }
    return () => {
      setEntityTitle('');
    };
  }, [user, setEntityTitle]);

  const profileData = useMemo(() => {
    if (isAdminPage && user) {
      return { ...defaultValues, ...user };
    } else if (currentUser?.user) {
      return { ...defaultValues, ...currentUser.user };
    }

    return { ...defaultValues };
  }, [isAdminPage, user, currentUser]);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<UpdateProfileForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: profileData,
    resolver: zodResolver(getSchema(t)),
  });

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
        <Form
          labelPosition={'left'}
          labelWidth={3}
          gap={6}
          maxWidth={'1200px'}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading || isUserLoading}
        >
          <PersonalData control={control} register={register} isAdminPage={isAdminPage} />
          <Contacts control={control} register={register} />
          <SystemData
            control={control}
            register={register}
            isAdminPage={isAdminPage}
            profileData={profileData}
          />

          <FormButtons>
            {!isAdminPage && (
              <Button onClick={onChangePassword}>
                {t('ACTION.CHANGE', {
                  type: t('AUTH.PASSWORD.NAME').toLowerCase(),
                })}
              </Button>
            )}
            <Button
              color={'primary'}
              variant={'contained'}
              type={'submit'}
              disabled={!isValid && isSubmitted}
              isLoading={false}
            >
              {t('ACTION.SAVE')}
            </Button>
          </FormButtons>
        </Form>
      </Stack>
    </>
  );
};

export default Profile;
