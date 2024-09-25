import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { useLoginMutation } from '~/api/queries/accounts/login.mutation';
import { LoginResponseWithRefreshToken } from '~/api/utils/api-requests';
import { FormCheckbox } from '~/components/react-hook-form/form-checkbox/form-checkbox.component';
import { FormInputText } from '~/components/react-hook-form/form-input-text/form-input-text.component';
import { Button } from '~/ui-components/button/button.component';
import { Form, FormButtons, FormItem } from '~/ui-components/form';
import {
  authPath,
  homePath,
  registerPath,
  resetPasswordPath,
} from '~/utils/configuration/routes-paths';
import {
  projectLocalStorageService,
  projectSessionStorageService,
} from '~/utils/localstorage/project-storage/project-storage-instance';
import { ProjectStorageKey } from '~/utils/localstorage/project-storage/project-storage.types';
import { showErrorMessage } from '~/utils/show-error-message';
import { useAuthenticate } from '~/utils/use-authenticate.hook';

import { schema, LoginForm as ILoginForm } from './login-form.schema';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { from: Location };
  const { mutateAsync: login, isPending } = useLoginMutation();
  const { getUser } = useAuthenticate();

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

  const calculateLocation = async (locationState: { from: Location }) => {
    const user = await getUser();
    const sameUser = projectLocalStorageService.get(ProjectStorageKey.UserId) === user?.id;
    projectLocalStorageService.set(ProjectStorageKey.UserId, user?.id ?? '');
    return sameUser && locationState?.from ? locationState.from.pathname : homePath;
  };

  const onSuccess = async (response: LoginResponseWithRefreshToken, formData: ILoginForm) => {
    const storage = formData.rememberMe ? projectLocalStorageService : projectSessionStorageService;
    storage.set(ProjectStorageKey.RememberMe, formData.rememberMe);
    storage.set(ProjectStorageKey.AccessToken, response.accessTokenInfo?.token ?? '');
    storage.set(ProjectStorageKey.RefreshToken, response.refreshTokenInfo?.token ?? '');

    const location = await calculateLocation(locationState);
    navigate(location);
  };

  const onSubmit = async (formData: ILoginForm) => {
    await login(formData, {
      onSuccess: res => void onSuccess(res, formData),
      onError: e => showErrorMessage(e, 'ERROR.NOT_AUTHORIZED'),
    });
  };

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
