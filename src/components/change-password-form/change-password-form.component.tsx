import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Form, FormItem, FormButtons, Button, InputText } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetPasswordConfigurationQuery } from '~/api/queries/settings/get-password-configuration.query';
import { AccountConfiguration } from '~/api/utils/api-requests';
import { FormInputText } from '~/components/react-hook-form';

import {
  ChangePasswordForm as IChangePasswordForm,
  getSchema,
} from './change-password-form.schema';
import { RulesTooltip } from './rules-tooltip/rules-tooltip.component';

interface ChangePasswordFormProps {
  isPending?: boolean;
  username?: string;
  isSettingNew?: boolean;
  onReject?: () => void;
  onSave: (values: IChangePasswordForm) => void;
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSave,
  onReject,
  username = '',
  isPending = false,
  isSettingNew = false,
}) => {
  const { t } = useTranslation();

  const { data: passwordConfig } = useGetPasswordConfigurationQuery({
    placeholderData: {} as AccountConfiguration,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isLoading },
  } = useForm<IChangePasswordForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(passwordConfig!, t)),
  });

  return (
    <Form onSubmit={handleSubmit(onSave)} isRequired>
      <FormItem label={t('USER.EMAIL')} isHidden={!username}>
        <InputText value={username} isReadonly />
      </FormItem>
      <FormItem
        label={
          <Stack display={'inline-flex'} direction={'row'} alignItems={'center'} gap={'4px'}>
            <span>
              {isSettingNew
                ? t('COMMON.NEW', { type: t('AUTH.PASSWORD.NAME').toLowerCase() })
                : t('AUTH.PASSWORD.NAME')}
            </span>
            <RulesTooltip config={passwordConfig} />
          </Stack>
        }
      >
        <FormInputText
          type={'password'}
          autoComplete={'new-password'}
          controllerProps={{ ...register('password'), control }}
        />
      </FormItem>
      <FormItem label={t('AUTH.PASSWORD.REPEAT')}>
        <FormInputText
          type={'password'}
          autoComplete={'new-password'}
          controllerProps={{ ...register('confirmedPassword'), control }}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isPending || isLoading}
        >
          {t('AUTH.PASSWORD.CREATE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
