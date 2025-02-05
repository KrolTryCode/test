import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppConfigurationQuery } from '~/api/queries/app/app-configuration.query';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText, FormCheckbox } from '~/components/react-hook-form';

import { schema, ILoginForm } from './login-form.schema';

interface LoginFormProps {
  onSave: (data: ILoginForm) => void;
  isPending?: boolean;
}

export function LoginForm({ onSave, isPending }: LoginFormProps) {
  const { t } = useTranslation();
  const { data: config } = useAppConfigurationQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSave)}>
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
