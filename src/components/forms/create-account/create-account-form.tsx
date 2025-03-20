import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button } from '@pspod/ui-components';
import { useIsMutating } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { userQueries } from '~/api/queries/users/queries';
import { FormInputText } from '~/components/react-hook-form';

import { schema, ICreateAccountForm } from './create-account-form.schema';

export interface CreateAccountFormModalProps {
  type: 'modal';
  onSave: (data: ICreateAccountForm) => Promise<unknown>;
  onReject: () => void;
  onResolve: (data: ICreateAccountForm) => void;
}

interface CreateAccountFormPageProps {
  type: 'page';
  onSave: (data: ICreateAccountForm) => Promise<unknown>;
  onReject: () => void;
  onResolve?: undefined;
}

export const CreateAccountForm: FC<CreateAccountFormModalProps | CreateAccountFormPageProps> = ({
  onSave,
  onReject,
  onResolve,
}) => {
  const { t } = useTranslation();

  const isMutating = useIsMutating({ mutationKey: userQueries._def });

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

  const onSubmit = async (data: ICreateAccountForm) => {
    await onSave(data);
    onResolve?.(data);
  };

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onSubmit)}>
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
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          variant={'contained'}
          color={'primary'}
          isLoading={!!isMutating}
        >
          {t('ACTION.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() })}
        </Button>
      </FormButtons>
    </Form>
  );
};
