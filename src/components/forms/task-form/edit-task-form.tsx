import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
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
  isPending?: boolean;
}

export const EditTaskForm: FC<EditTaskFormProps> = ({ data, onSave, isPending }) => {
  const { t } = useTranslation();

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
      maxWidth={'900px'}
    >
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <ParametersTable formId={data?.id ?? ''} projectId={data?.projectId ?? ''} />
      <FormButtons marginTop={2}>
        <ButtonLink
          to={'/projects/project/$projectId/forms'}
          params={{ projectId: data?.projectId ?? '' }}
        >
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
  );
};
