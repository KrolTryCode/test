import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useLoginMutation } from '~/api/queries/accounts/login.mutation';
import { useAppConfigurationQuery } from '~/api/queries/app/app-configuration.query';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText, FormCheckbox } from '~/components/react-hook-form';
import { useAuthenticate } from '~/utils/hooks/use-authenticate';
import { showErrorMessage } from '~/utils/show-error-message';

import { schema, LoginForm as ILoginForm } from './login-form.schema';

export const Route = createFileRoute('/_auth/auth/_login/login')({
  component: LoginForm,
  staticData: {
    title: 'USER.LOGIN',
  },
});

export function LoginForm() {
  const { t } = useTranslation();
  const { data: config } = useAppConfigurationQuery();
  const { onLogin } = useAuthenticate();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { isValid, isSubmitted },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { mutateAsync: login, isPending } = useLoginMutation({
    onSuccess: data => onLogin(data, getValues('rememberMe')),
    onError: e => showErrorMessage(e, 'ERROR.NOT_AUTHORIZED'),
  });

  const onSubmit = (formData: ILoginForm) => login(formData);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem label={t('USER.LOGIN')}>
        <FormInputText
          variant={'filled'}
          placeholder={t('USER.LOGIN')}
          controllerProps={{ ...register('username'), control }}
        />
      </FormItem>
      <FormItem label={t('AUTH.PASSWORD.NAME')}>
        <FormInputText
          variant={'filled'}
          type={'password'}
          placeholder={t('AUTH.PASSWORD.NAME')}
          controllerProps={{ ...register('password'), control }}
        />
      </FormItem>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <FormCheckbox
          label={t('AUTH.REMEMBER_ME')}
          controllerProps={{ ...register('rememberMe'), control }}
        />
        <ButtonLink variant={'text'} to={'/auth/reset-password'}>
          {t('AUTH.PASSWORD.FORGOT')}
        </ButtonLink>
      </Stack>
      <FormButtons>
        {config?.userSelfRegistration && (
          <ButtonLink to={'/auth/register'}>{t('ACTION.REGISTER')}</ButtonLink>
        )}
        <Button
          type={'submit'}
          isLoading={isPending}
          disabled={!isValid && isSubmitted}
          variant={'contained'}
          color={'primary'}
        >
          {t('ACTION.ENTER')}
        </Button>
      </FormButtons>
    </Form>
  );
}
