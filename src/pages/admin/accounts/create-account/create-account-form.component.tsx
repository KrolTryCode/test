import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  FormItem,
  FormButtons,
  Button,
  notifySuccess,
  CreateModalProps,
  modal,
} from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import {
  useCreateUserMutation,
  useSelfCreateUserMutation,
} from '~/api/queries/users/create-user.mutation';
import { FormInputText } from '~/components/react-hook-form';
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

  const onSubmit = (values: ICreateAccountForm) => createUserMutation.mutateAsync(values);

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
          isLoading={createUserMutation.isPending}
        >
          {t('ACTION.CREATE', { type: t('ENTITY.ACCOUNT').toLowerCase() })}
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
