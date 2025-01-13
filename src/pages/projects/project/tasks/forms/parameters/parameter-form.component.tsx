import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormParameter, FormParameterInput } from '~/api/mocks/forms/parameters/types';
import { FormInputText } from '~/components/react-hook-form';
import { schema } from '~/pages/projects/project/tasks/forms/parameters/parameters-form.schema';

interface ParameterFormProps {
  data?: FormParameter;
  onReject?: () => void;
  onResolve: (values: FormParameterInput) => void;
}

export const ParameterForm: FC<ParameterFormProps> = ({ data, onResolve, onReject }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: data ?? schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.TYPE')} isRequired>
        <FormInputText controllerProps={{ ...register('type'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DEFAULT_VALUE')}>
        <FormInputText controllerProps={{ ...register('defaultValue'), control }} />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject}>{t('ACTION.CANCEL')}</Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
