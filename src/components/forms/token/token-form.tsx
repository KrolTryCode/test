import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, modal } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useGetAllRolesQuery } from '~/api/queries/roles/get-all-roles.query';
import { FormDateTimePicker, FormInputText, FormSelect } from '~/components/react-hook-form';

import { ICreateTokenForm, schema } from './token-form.schema';

interface TokenFormProps {
  onReject?: () => void;
  onResolve: (data: ICreateTokenForm) => void;
}

const TokenForm: FC<TokenFormProps> = ({ onReject, onResolve }) => {
  const { t } = useTranslation();
  const { data: roles = [] } = useGetAllRolesQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<ICreateTokenForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem isRequired label={t('COMMON.TITLE')}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem isRequired label={t('COMMON.DATE_EXPIRED')}>
        <FormDateTimePicker
          type={'datetime'}
          controllerProps={{ ...register('expirationDate'), control }}
          minDate={new Date()}
        />
      </FormItem>
      <FormItem isRequired label={t('ENTITY.ROLE')}>
        <FormSelect
          items={roles}
          displayExpr={'title'}
          controllerProps={{ ...register('roleId'), control }}
        />
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
        >
          {t('ACTION.GENERATE_TOKEN')}
        </Button>
      </FormButtons>
    </Form>
  );
};

interface GenerateTokenModalProps {
  title: string;
  onSave: (data: ICreateTokenForm) => void;
}

export const generateTokenModal = ({ title, onSave }: GenerateTokenModalProps) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (args: InstanceProps<ICreateTokenForm, never>) => <TokenForm {...args} />,
  });
