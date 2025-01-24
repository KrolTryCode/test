import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, notifySuccess } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useStartAccountRecoveryMutation } from '~/api/queries/accounts/start-account-recovery.mutation';
import { FormInputText } from '~/components/react-hook-form';
import { showErrorMessage } from '~/utils/show-error-message';

import { SendEmailForm, schema } from './reset-password.schema';

export const Route = createFileRoute('/_auth/auth/_reset-password/reset-password')({
  component: ForgotPasswordPage,
  staticData: {
    title: 'AUTH.PASSWORD.FORGOT',
  },
});

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<SendEmailForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { mutateAsync: startRecovery, isPending } = useStartAccountRecoveryMutation({
    onSuccess: () => notifySuccess(t('ACCOUNT.RECOVERY.CODE_SENT')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const onSubmit = async (formData: SendEmailForm) => {
    await startRecovery(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem isRequired label={t('USER.EMAIL')}>
        <FormInputText
          controllerProps={{ ...register('email'), control }}
          placeholder={t('USER.EMAIL')}
          type={'email'}
        />
      </FormItem>
      <FormButtons>
        <Button
          onClick={() => void navigate({ to: `/auth/login` })}
          variant={'outlined'}
          color={'primary'}
        >
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isPending}
        >
          {t('ACTION.SEND')}
        </Button>
      </FormButtons>
    </Form>
  );
}
