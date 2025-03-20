import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { DataType, ParameterField } from '~/api/utils/api-requests';
import { DefaultValueComponent } from '~/components/forms/parameter-field/parameter-default-value';
import { ParameterFieldForm } from '~/components/forms/parameter-field/parameter-field.type';
import { FormCheckbox, FormInputText, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

import { getSchema } from './edit-parameter-field-form.schema';

interface EditParameterFormProps {
  data: ParameterField;
  parameterKeys: string[];
  onReject?: () => void;
  onResolve: (values: ParameterField) => void;
}

export const EditParameterForm: FC<EditParameterFormProps> = ({
  data,
  parameterKeys,
  onResolve,
  onReject,
}) => {
  const { t, translateColumnType } = useCustomTranslations();

  const schema = getSchema(data, parameterKeys, t);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ParameterFieldForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data,
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: ParameterFieldForm) => {
    if (!values.defaultValue?.toString()) {
      onResolve({ ...data, ...values, defaultValue: '' });
      return;
    }

    if (values.type === DataType.Timestamp) {
      onResolve({
        ...data,
        ...values,
        defaultValue: new Date(values.defaultValue as string).getTime().toString(),
      });
      return;
    }

    if (values.type === DataType.Date) {
      onResolve({
        ...data,
        ...values,
        defaultValue: new Date(values.defaultValue as string).toJSON(),
      });
      return;
    }

    const defaultValue =
      typeof values.defaultValue === 'string'
        ? values.defaultValue
        : JSON.stringify(values.defaultValue);
    onResolve({ ...data, ...values, defaultValue });
  };

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onSubmit)}>
      <FormItem label={t('COMMON.TITLE')} isRequired isDisabled={data.isDefault}>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.TYPE')} isRequired isDisabled>
        <FormSelect
          items={Object.values(DataType)}
          translateItemsFunction={translateColumnType}
          controllerProps={{ ...register('type'), control }}
          onChange={value => {
            setValue('defaultValue', undefined);
            return value;
          }}
        />
      </FormItem>
      <FormItem label={t('COMMON.KEY')} isRequired isDisabled={data.isDefault}>
        <FormInputText controllerProps={{ ...register('key'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DEFAULT_VALUE')}>
        <DefaultValueComponent control={control} register={register} />
      </FormItem>
      <FormItem isDisabled={data.isDefault}>
        <FormCheckbox
          label={t('ERROR.REQUIRED')}
          controllerProps={{ ...register('isRequired'), control }}
        />
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
