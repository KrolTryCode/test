import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { ToOptions, useParams } from '@tanstack/react-router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ParameterForm, UpdateParameterFormRequest } from '~/api/utils/api-requests';
import { ButtonLink } from '~/components/implicit-links';
import { FormInputText } from '~/components/react-hook-form';
import { ParametersTable } from '~/components/tables/form-parameter-fields/form-parameter-fields.component';

import { schema } from './task-form.schema';

interface EditTaskFormProps {
  data?: ParameterForm;
  onSave: (data: UpdateParameterFormRequest) => void;
  backOptions: ToOptions;
  isPending?: boolean;
}

export const EditTaskForm: FC<EditTaskFormProps> = ({ data, onSave, backOptions, isPending }) => {
  const { t } = useTranslation();
  const { projectId = '' } = useParams({ strict: false });

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<UpdateParameterFormRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form
      showColonAfterLabel
      labelPosition={'left'}
      labelWidth={4}
      gap={1}
      onSubmit={handleSubmit(onSave)}
      isLoading={!data}
    >
      <Stack width={'48vw'}>
        <FormItem label={t('COMMON.TITLE')} isRequired>
          <FormInputText controllerProps={{ ...register('name'), control }} />
        </FormItem>
      </Stack>
      <ParametersTable formId={data?.id ?? ''} projectId={projectId} />
      <FormButtons marginTop={2}>
        <ButtonLink {...backOptions}>{t('ACTION.CANCEL')}</ButtonLink>
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
  );
};
