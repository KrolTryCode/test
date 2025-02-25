import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { User } from '~/api/utils/api-requests';

import { confirmEmailModal } from './confirm-email-change.component';
import { Contacts } from './contacts.component';
import { PersonalData } from './personal-data.component';
import { schema, UpdateUserRequestNullable } from './profile-form.schema';
import { SystemData } from './system-data.component';

interface CommonProfileFormProps {
  data?: User;
  handleUpdateUser: (values: UpdateUserRequestNullable) => Promise<void>;
}

interface AccountProfileFormProps extends CommonProfileFormProps {
  isCurrent: false;
  handleChangeAccountPassword: () => void;
}

interface CurrentProfileFormProps extends CommonProfileFormProps {
  isCurrent: true;
  handleChangePassword: () => void;
}

type ProfileFormProps = AccountProfileFormProps | CurrentProfileFormProps;

export const ProfileForm: FC<ProfileFormProps> = ({ data, handleUpdateUser, ...specificProps }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<UpdateUserRequestNullable>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data?.id ? getFormData(data) : undefined,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const onSubmit = (fieldValues: UpdateUserRequestNullable) => {
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
      gap={5}
      maxWidth={'900px'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <PersonalData
        control={control}
        register={register}
        onChangePasswordByAdmin={
          !specificProps.isCurrent ? specificProps.handleChangeAccountPassword : undefined
        }
      />
      <Contacts control={control} register={register} />
      <SystemData
        control={control}
        register={register}
        isAdminPage={!specificProps.isCurrent}
        profileData={data}
      />

      <FormButtons isSticky marginTop={0}>
        <Button
          variant={'outlined'}
          color={'primary'}
          hidden={!specificProps.isCurrent}
          onClick={specificProps.isCurrent ? specificProps.handleChangePassword : undefined}
        >
          {t('ACTION.CHANGE', {
            type: t('AUTH.PASSWORD.NAME').toLowerCase(),
          })}
        </Button>
        <Button
          color={'primary'}
          variant={'contained'}
          type={'submit'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};

function getFormData(user: User): UpdateUserRequestNullable {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    surName: user.surName,
    email: user.email,
    company: user.company,
    division: user.division,
    position: user.position,
    phoneNumber: user.phoneNumber,
  };
}
