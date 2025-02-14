import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, InputText } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getPasswordConfigurationQueryOptions } from '~/api/queries/settings/get-password-configuration.query';
import { AccountConfiguration } from '~/api/utils/api-requests';
import { LabelWithRules } from '~/components/label-with-rules/label-with-rules.component';
import { PasswordRuleList } from '~/components/password-rule-list/rule-list.component';
import { FormInputText } from '~/components/react-hook-form';

import {
  ChangePasswordForm as IChangePasswordForm,
  getSchema,
} from './change-password-form.schema';

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

  const { data: passwordConfig } = useQuery(getPasswordConfigurationQueryOptions());

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isLoading },
  } = useForm<IChangePasswordForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(getSchema(passwordConfig ?? ({} as AccountConfiguration), t)),
  });

  return (
    <Form onSubmit={handleSubmit(onSave)} isRequired>
      <FormItem label={t('USER.EMAIL')} isHidden={!username}>
        <InputText value={username} isReadonly />
      </FormItem>
      <FormItem
        label={
          <LabelWithRules
            label={
              isSettingNew
                ? t('COMMON.NEW', { type: t('AUTH.PASSWORD.NAME').toLowerCase() })
                : t('AUTH.PASSWORD.NAME')
            }
            content={passwordConfig ? <PasswordRuleList config={passwordConfig} /> : undefined}
          />
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
