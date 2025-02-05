import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, modal } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useGetAllPermissionsQuery } from '~/api/queries/roles/get-all-permissions.query';
import { CreateRole } from '~/api/utils/api-requests';
import { FormInputText, FormSelect } from '~/components/react-hook-form';

import { schema } from './role-form.schema';

interface RoleFormProps {
  onResolve: (data: CreateRole) => void;
  onReject: () => void;
}

const RoleForm: FC<RoleFormProps> = ({ onResolve, onReject }) => {
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
    defaultValues: schema.getDefault(),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
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
          disabled={!isValid && isSubmitted}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};

export const addRoleModal = ({
  title,
  onSave,
}: {
  title: string;
  onSave: RoleFormProps['onResolve'];
}) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (modalInstance: InstanceProps<CreateRole, never>) => (
      <RoleForm {...modalInstance} />
    ),
  });
