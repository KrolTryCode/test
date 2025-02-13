import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { CreateParameterFieldRequest, DataType } from '~/api/utils/api-requests';
import { DefaultValueComponent } from '~/components/forms/parameter-field/parameter-default-value';
import { ParameterFieldForm } from '~/components/forms/parameter-field/parameter-field.type';
import { FormCheckbox, FormInputText, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

import { getSchema } from './add-parameter-field-form.schema';

interface AddParameterFormProps {
  parameterKeys: string[];
  onReject?: () => void;
  onResolve: (values: CreateParameterFieldRequest) => void;
}

export const AddParameterForm: FC<AddParameterFormProps> = ({
  parameterKeys,
  onResolve,
  onReject,
}) => {
  const { t, translateColumnType } = useCustomTranslations();

  const schema = getSchema(parameterKeys, t);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
    getValues,
    watch,
  } = useForm<ParameterFieldForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: ParameterFieldForm) => {
    const defaultValue =
      typeof values.defaultValue === 'string'
        ? values.defaultValue
        : JSON.stringify(values.defaultValue);

    onResolve({ ...values, defaultValue });
  };

  //костыль - без этого поле не перерисовывается
  const _typeValue = watch('type');

  const values = getValues();

  const DefaultValueComp = useMemo(
    () => <DefaultValueComponent data={values} register={register} control={control} />,
    [values, register, control],
  );

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onSubmit)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.TYPE')} isRequired>
        <FormSelect
          items={Object.values(DataType)}
          translateItemsFunction={translateColumnType}
          controllerProps={{ ...register('type'), control }}
        />
      </FormItem>
      <FormItem label={t('COMMON.KEY')} isRequired>
        <FormInputText controllerProps={{ ...register('key'), control }} />
      </FormItem>
      {values.type === DataType.Boolean ? (
        DefaultValueComp
      ) : (
        <FormItem label={t('COMMON.DEFAULT_VALUE')}>{DefaultValueComp}</FormItem>
      )}
      <FormCheckbox
        label={t('ERROR.REQUIRED')}
        controllerProps={{ ...register('isRequired'), control }}
      />
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
