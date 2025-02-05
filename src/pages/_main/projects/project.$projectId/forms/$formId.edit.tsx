import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import { Button, Form, FormButtons, FormItem, notifySuccess } from '@pspod/ui-components';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetFormQuery } from '~/api/queries/forms/get-form.query';
import { useUpdateFormMutation } from '~/api/queries/forms/update-form.mutation';
import { UpdateParameterFormRequest } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText } from '~/components/react-hook-form';
import { ParametersTable } from '~/pages/_main/projects/project.$projectId/forms/parameter-fields/parameter-fields.component';
import { schema } from '~/pages/_main/projects/project.$projectId/forms/task-form.schema';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/$formId/edit')({
  component: EditTaskFormPage,
});

function EditTaskFormPage() {
  const { projectId, formId } = Route.useParams();
  const { t } = useTranslation();
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  const { data, isLoading } = useGetFormQuery(formId);
  const { mutate: updateForm, isPending } = useUpdateFormMutation(projectId, formId, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, t('ERROR.UPDATE_FAILED')),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<UpdateParameterFormRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data ?? schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const onSubmit = (form: UpdateParameterFormRequest) => {
    void updateForm(form);
  };

  return (
    <Stack padding={1} gap={2} sx={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.EDIT', { type: declinatedForm })}
      </Typography>
      <Form
        showColonAfterLabel
        labelPosition={'left'}
        labelWidth={4}
        gap={1}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
        maxWidth={'900px'}
      >
        <FormItem label={t('COMMON.TITLE')} isRequired>
          <FormInputText controllerProps={{ ...register('name'), control }} />
        </FormItem>
        <ParametersTable formId={data?.id ?? ''} />
        <FormButtons marginTop={2}>
          <ButtonLink to={Route.parentRoute.fullPath} params={{ projectId }}>
            {t('ACTION.CANCEL')}
          </ButtonLink>
          <Button
            type={'submit'}
            disabled={!isValid && isSubmitted}
            isLoading={isPending}
            variant={'contained'}
            color={'primary'}
          >
            {t('ACTION.SAVE')}
          </Button>
        </FormButtons>
      </Form>
    </Stack>
  );
}
