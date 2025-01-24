import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, FormButtons, Button, notifySuccess } from '@pspod/ui-components';
import { useNavigate } from '@tanstack/react-router';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useUpdateTemplateMutation } from '~/api/queries/templates/update-template.mutation';
import { CreateTemplateRequest, Template } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText } from '~/components/react-hook-form';
import { FormInputRichTextEditor } from '~/components/react-hook-form/form-input-rich-editor/form-input-rich-editor.component';
import { showErrorMessage } from '~/utils/show-error-message';

import { defaultValues, schema } from './template-form.schema';

export type TemplateFormProps = {
  data?: Template;
};

export const TemplateForm: FC<TemplateFormProps> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<CreateTemplateRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: data ?? defaultValues,
    resolver: yupResolver(schema),
  });

  const updateTemplateMutation = useUpdateTemplateMutation();

  const onSubmit = useCallback(
    async (template: Template) => {
      await updateTemplateMutation.mutateAsync(
        {
          templateId: data?.id ?? '',
          content: template.content ?? '',
        },
        {
          onSuccess: () => {
            notifySuccess(t('MESSAGE.UPDATE_SUCCESS'));
            void navigate({ to: '/admin/templates' });
          },
          onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
        },
      );
    },
    [data?.id, navigate, t, updateTemplateMutation],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem isRequired label={t('COMMON.TITLE')} isDisabled>
        <FormInputText isReadonly controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem isRequired>
        <FormInputRichTextEditor controllerProps={{ ...register('content'), control }} />
      </FormItem>
      <FormButtons marginTop={2}>
        <ButtonLink to={'/admin/templates'} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </ButtonLink>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          disabled={!isValid && isSubmitted}
          isLoading={updateTemplateMutation.isPending}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
