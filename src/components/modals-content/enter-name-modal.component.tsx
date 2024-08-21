import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { modal } from '~/components/modal/modal';
import { CreateModalProps } from '~/components/modal/modal.type';
import { FormInputText } from '~/components/react-hook-form';
import { Button } from '~/ui-components/button/button.component';
import { Form, FormButtons, FormItem } from '~/ui-components/form';

interface EnterNameFormProps
  extends Pick<CreateModalProps<Record<string, never>>, 'onResolve' | 'onReject'> {
  buttonText?: string;
  suggestedName?: string;
}

const EnterNameForm: FC<EnterNameFormProps> = ({
  onResolve,
  onReject,
  buttonText,
  suggestedName,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<{ name: string }>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { name: suggestedName },
  });

  const onSubmit = async (values: { name: string }) => {
    onResolve(values.name);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} showColonAfterLabel>
      <FormItem isRequired label={t('COMMON.TITLE')}>
        <FormInputText
          autoFocus
          controllerProps={{
            ...register('name'),
            rules: { required: t('yup:mixed.required') },
            control,
          }}
        />
      </FormItem>

      <FormButtons>
        <Button onClick={onReject}>{t('BUTTON.CANCEL')}</Button>
        <Button
          variant={'contained'}
          color={'primary'}
          type={'submit'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {buttonText ?? t('BUTTON.CREATE')}
        </Button>
      </FormButtons>
    </Form>
  );
};

interface EnterNameModalParams {
  onOk: (name: string) => void | Promise<void>;
  title: string;
  buttonText?: string;
  suggestedName?: string;
}

export const enterNameModal = ({
  onOk,
  title,
  buttonText,
  suggestedName,
}: EnterNameModalParams) => {
  modal({
    onOk,
    title,
    renderContent: (args: InstanceProps<string, never>) => (
      <EnterNameForm buttonText={buttonText} suggestedName={suggestedName} {...args} />
    ),
  });
};
