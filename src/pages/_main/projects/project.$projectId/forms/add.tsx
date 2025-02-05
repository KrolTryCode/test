import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import { Button, Form, FormButtons, FormItem, notifySuccess } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAddFormMutation } from '~/api/queries/forms/add-form.mutation';
import { CreateProjectParameterFormRequest } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText } from '~/components/react-hook-form';
import { schema } from '~/pages/_main/projects/project.$projectId/forms/task-form.schema';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_main/projects/project/$projectId/forms/add')({
  component: AddTaskFormPage,
});

function AddTaskFormPage() {
  const { projectId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: addForm, isPending } = useAddFormMutation(projectId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      void navigate({
        to: '/projects/project/$projectId/forms',
        params: { projectId },
      });
    },
    onError: e => {
      showErrorMessage(e, t('ERROR.CREATION_FAILED'));
    },
  });

  const onSubmit = (form: CreateProjectParameterFormRequest) => {
    void addForm(form);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<CreateProjectParameterFormRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  return (
    <Stack padding={1} gap={2} sx={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.ADD', { type: declinatedForm })}
      </Typography>
      <Form
        showColonAfterLabel
        labelPosition={'left'}
        labelWidth={4}
        gap={1}
        onSubmit={handleSubmit(onSubmit)}
        maxWidth={'900px'}
      >
        <FormItem label={t('COMMON.TITLE')} isRequired>
          <FormInputText controllerProps={{ ...register('name'), control }} />
        </FormItem>
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
