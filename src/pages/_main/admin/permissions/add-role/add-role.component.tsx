import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, notifySuccess, modal } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useCreateRoleMutation } from '~/api/queries/roles/create-role.mutation';
import { useGetAllPermissionsQuery } from '~/api/queries/roles/get-all-permissions.query';
import { CreateRole } from '~/api/utils/api-requests';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { showErrorMessage } from '~/utils/show-error-message';

import { schema, defaultValues } from './add-role.schema';

interface AddRoleProps {
  onResolve: () => void;
  onReject: () => void;
}

const AddRole: FC<AddRoleProps> = ({ onResolve, onReject }) => {
  const { t } = useTranslation();

  const { data: permissions = [] } = useGetAllPermissionsQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<CreateRole>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const createRoleMutation = useCreateRoleMutation({
    onSuccess: () => {
      onResolve();
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const onSubmit = (role: CreateRole) => createRoleMutation.mutate(role);

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onSubmit)}>
      <FormItem isRequired label={t('COMMON.TITLE')}>
        <FormInputText controllerProps={{ ...register('title'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText isMultiline controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem label={t('NAVIGATION.PERMISSIONS')}>
        <FormSelect
          isMultiple
          disableClearable
          items={permissions}
          displayExpr={'description'}
          controllerProps={{ ...register('permissions'), control }}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t(`ACTION.CANCEL`)}
        </Button>
        <Button
          color={'primary'}
          variant={'contained'}
          type={'submit'}
          isLoading={createRoleMutation.isPending}
          disabled={!isValid && isSubmitted}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};

export const addRoleModal = ({ title }: { title: string }) =>
  modal({
    title,
    renderContent: (modalInstance: InstanceProps<AddRoleProps['onResolve'], never>) => (
      <AddRole {...modalInstance} />
    ),
  });
