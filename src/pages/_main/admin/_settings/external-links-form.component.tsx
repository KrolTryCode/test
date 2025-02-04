import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, modal } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { FormInputText } from '~/components/react-hook-form';

import { schema, ExternalLinkForm } from './external-links.schema';

interface ExternalLinksFormProps {
  onSave: (data: ExternalLinkForm) => void;
  onCancel: () => void;
}

const ExternalLinksForm: FC<ExternalLinksFormProps> = ({ onSave, onCancel }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<ExternalLinkForm>({
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
  onOk: (data: ExternalLinkForm) => Promise<void>;
}) => {
  modal({
    title,
    onOk,
    renderContent: (modalInstance: InstanceProps<ExternalLinkForm>) => (
      <ExternalLinksForm
        {...modalInstance}
        onSave={modalInstance.onResolve}
        onCancel={modalInstance.onReject}
      />
    ),
  });
};
