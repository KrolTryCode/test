import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import {
  useCreateUserMutation,
  useSelfCreateUserMutation,
} from '~/api/queries/users/create-user.mutation';
import { modal } from '~/components/modal/modal';
import { CreateModalProps } from '~/components/modal/modal.type';
import { FormInputText } from '~/components/react-hook-form/form-input-text/form-input-text.component';
import { Button } from '~/ui-components/button/button.component';
import { Form, FormItem, FormButtons } from '~/ui-components/form';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

import { schema, CreateAccountForm as ICreateAccountForm } from './create-account.schema';

type CreateAccountFormProps = Pick<
  CreateModalProps<Record<string, never>>,
  'onResolve' | 'onReject'
> & { selfRegistration?: boolean };

export const CreateAccountForm: FC<CreateAccountFormProps> = ({
  onReject,
  onResolve,
  selfRegistration,
}) => {
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

  const mutation = selfRegistration ? useSelfCreateUserMutation : useCreateUserMutation;

  const createUserMutation = mutation({
    onSuccess() {
      onResolve();
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const onSubmit = async (values: ICreateAccountForm) =>
    await createUserMutation.mutateAsync(values);

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
        <Button onClick={onReject}>{t('BUTTON.CANCEL')}</Button>
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          variant={'contained'}
          color={'primary'}
          isLoading={createUserMutation.isPending}
        >
          {t('BUTTON.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() })}
        </Button>
      </FormButtons>
    </Form>
  );
};

export const createAccountModal = ({ title }: { title: string }) =>
  modal({
    title,
    renderContent: (modalInstance: InstanceProps<never, never>) => (
      <CreateAccountForm {...modalInstance} />
    ),
  });
