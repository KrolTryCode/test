import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateTemplateRequest } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText, FormInputRichTextEditor } from '~/components/react-hook-form';

import { schema } from './template-form.schema';

interface TemplateFormProps {
  data: CreateTemplateRequest;
  onSave: (data: Required<CreateTemplateRequest>) => void;
  isPending?: boolean;
  isLoading?: boolean;
}

export const TemplateForm: FC<TemplateFormProps> = ({ data, isLoading, isPending, onSave }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<CreateTemplateRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form isRequired isLoading={isLoading} onSubmit={handleSubmit(onSave)}>
      <FormItem label={t('COMMON.TITLE')} isDisabled>
        <FormInputText isReadonly controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem>
        <FormInputRichTextEditor controllerProps={{ ...register('content'), control }} />
      </FormItem>
      <FormButtons marginTop={1}>
        <ButtonLink to={'/admin/templates'} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </ButtonLink>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          disabled={!isValid && isSubmitted}
          isLoading={isPending}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
