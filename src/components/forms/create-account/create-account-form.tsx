import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInputText } from '~/components/react-hook-form';

import { schema, ICreateAccountForm } from './create-account-form.schema';

interface CreateAccountFormProps {
  onSave: (data: ICreateAccountForm) => void;
  isPending?: boolean;
  onCancel?: () => void;
}

export const CreateAccountForm: FC<CreateAccountFormProps> = ({ onSave, onCancel, isPending }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<ICreateAccountForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onSave)}>
      <FormItem isRequired label={t('USER.FIRST_NAME')}>
        <FormInputText controllerProps={{ ...register('firstName'), control }} />
      </FormItem>
      <FormItem isRequired label={t('USER.LAST_NAME')}>
        <FormInputText controllerProps={{ ...register('lastName'), control }} />
      </FormItem>
      <FormItem isRequired label={t('USER.EMAIL')}>
        <FormInputText type={'email'} controllerProps={{ ...register('email'), control }} />
      </FormItem>
      <FormButtons>
        <Button onClick={onCancel} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          variant={'contained'}
          color={'primary'}
          isLoading={isPending}
        >
          {t('ACTION.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() })}
        </Button>
      </FormButtons>
    </Form>
  );
};
