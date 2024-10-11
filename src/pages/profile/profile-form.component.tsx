import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Contacts } from './contacts/contacts.component';
import { PersonalData } from './personal-data/personal-data.component';
import { UpdateProfileForm, schema } from './profile-form.schema';
import { SystemData } from './system-data/system-data.component';
import { useChangePassword } from './use-change-password.hook';

interface ProfileFormProps {
  data?: UpdateProfileForm;
  onSubmit: (data: UpdateProfileForm) => void;
  isLoading?: boolean;
  isCurrent?: boolean;
}

export const ProfileForm: FC<ProfileFormProps> = ({ data, isLoading, isCurrent, onSubmit }) => {
  const { t } = useTranslation();

  const { onChangePassword } = useChangePassword(data?.email ?? '');

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<UpdateProfileForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    resolver: yupResolver(schema),
  });

  return (
    <Form
      labelPosition={'left'}
      labelWidth={3}
      gap={6}
      maxWidth={'1200px'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <PersonalData control={control} register={register} isAdminPage={!isCurrent} />
      <Contacts control={control} register={register} />
      <SystemData
        control={control}
        register={register}
        isAdminPage={!isCurrent}
        profileData={data}
      />

      <FormButtons>
        {isCurrent && (
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
  );
};
