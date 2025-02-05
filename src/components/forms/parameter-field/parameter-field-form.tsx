import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ParameterField } from '~/api/utils/api-requests';
import { useSelectColumnTypes } from '~/components/forms/table-column/use-select-column-types.hook';
import { FormCheckbox, FormInputText, FormSelect } from '~/components/react-hook-form';

import { ParameterFieldForm, getSchema } from './parameter-field-form.schema';

interface ParameterFormProps {
  data?: ParameterField;
  onReject?: () => void;
  onResolve: (values: ParameterField) => void;
}

export const ParameterForm: FC<ParameterFormProps> = ({ data, onResolve, onReject }) => {
  const { t } = useTranslation();
  const { selectColumnTypes } = useSelectColumnTypes();

  const schema = getSchema(t);

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

  const onSubmit = (values: ParameterFieldForm) => {
    onResolve({ ...data!, ...values });
  };

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onSubmit)}>
      <FormItem label={t('COMMON.TITLE')} isRequired isDisabled={data?.isDefault}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.TYPE')} isRequired isDisabled={data?.isDefault}>
        <FormSelect items={selectColumnTypes} controllerProps={{ ...register('type'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.KEY')} isRequired isDisabled={data?.isDefault}>
        <FormInputText controllerProps={{ ...register('key'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DEFAULT_VALUE')}>
        <FormInputText controllerProps={{ ...register('defaultValue'), control }} />
      </FormItem>
      <FormItem label={t('ERROR.REQUIRED')} isDisabled={data?.isDefault}>
        <FormCheckbox controllerProps={{ ...register('isRequired'), control }} />
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
