import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, notifySuccess } from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUpdateUserMutation } from '~/api/queries/users/update-user.mutation';
import { UpdateUserRequest, User } from '~/api/utils/api-requests';
import { confirmEmailModal } from '~/pages/profile/confirm-email-change.component';
import { showErrorMessage } from '~/utils/show-error-message';

import { Contacts } from './contacts/contacts.component';
import { PersonalData } from './personal-data/personal-data.component';
import { schema, UpdateUserRequestNullable } from './profile-form.schema';
import { SystemData } from './system-data/system-data.component';
import { useChangePassword } from './use-change-password.hook';

interface ProfileFormProps {
  userId: string;
  data?: User;
  isLoading?: boolean;
  isCurrent?: boolean;
}

export const ProfileForm: FC<ProfileFormProps> = ({ data, isLoading, isCurrent, userId }) => {
  const { t } = useTranslation();

  const { onChangePassword, onChangePasswordByAdmin } = useChangePassword(
    data?.email ?? '',
    userId,
  );

  const { mutateAsync: updateUser, isPending: isUserUpdating } = useUpdateUserMutation(userId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<UpdateUserRequestNullable>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const handleUpdateUser = useCallback(
    async (values: UpdateUserRequestNullable) => {
      await updateUser(values as UpdateUserRequest);
    },
    [updateUser],
  );

  const onSubmit = async (fieldValues: UpdateUserRequestNullable) => {
    if (fieldValues.email === data?.email) {
      void handleUpdateUser(fieldValues);
    } else {
      confirmEmailModal({
        onOk: () => handleUpdateUser(fieldValues),
      });
    }
  };

  return (
    <Form
      labelPosition={'left'}
      labelWidth={3}
      gap={6}
      maxWidth={'1200px'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <PersonalData
        control={control}
        register={register}
        onChangePassword={onChangePasswordByAdmin}
        isAdminPage={!isCurrent}
      />
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
          isLoading={isUserUpdating}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
