import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, modal } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { FormInputText } from '~/components/react-hook-form';

import { schema, IExternalLinkForm } from './external-link-form.schema';

interface ExternalLinkFormProps {
  onSave: (data: IExternalLinkForm) => void;
  onCancel: () => void;
}

const ExternalLinkForm: FC<ExternalLinkFormProps> = ({ onSave, onCancel }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<IExternalLinkForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <Form
      isRequired
      showColonAfterLabel
      labelPosition={'left'}
      labelWidth={1}
      onSubmit={handleSubmit(onSave)}
    >
      <FormItem label={t('COMMON.TITLE')}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={'URL'}>
        <FormInputText controllerProps={{ ...register('url'), control }} />
      </FormItem>
      <FormButtons marginTop={2}>
        <Button onClick={onCancel} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          disabled={!isValid && isSubmitted}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};

export const externalLinkFormModal = ({
  onOk,
  title,
}: {
  title: string;
  onOk: (data: IExternalLinkForm) => Promise<void>;
}) => {
  modal({
    title,
    onOk,
    renderContent: (modalInstance: InstanceProps<IExternalLinkForm>) => (
      <ExternalLinkForm
        {...modalInstance}
        onSave={modalInstance.onResolve}
        onCancel={modalInstance.onReject}
      />
    ),
  });
};
