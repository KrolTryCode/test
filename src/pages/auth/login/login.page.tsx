import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useLoginMutation } from '~/api/queries/accounts/login.mutation';
import { FormInputText, FormCheckbox } from '~/components/react-hook-form';
import { authPath, registerPath, resetPasswordPath } from '~/utils/configuration/routes-paths';
import { useAuthenticate } from '~/utils/hooks/use-authenticate';
import { showErrorMessage } from '~/utils/show-error-message';

import { schema, LoginForm as ILoginForm } from './login-form.schema';

const LoginForm = () => {
  const { t } = useTranslation();

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

  const onSubmit = async (formData: ILoginForm) => await login(formData);

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
        <Button component={Link} variant={'text'} to={`/${authPath}/${resetPasswordPath}`}>
          {t('AUTH.PASSWORD.FORGOT')}
        </Button>
      </Stack>
      <FormButtons>
        <Button component={Link} to={`/${authPath}/${registerPath}`}>
          {t('ACTION.REGISTER')}
        </Button>
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
};

export default LoginForm;
