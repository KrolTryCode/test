import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem, InputText } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Check, CheckOpcode, DataType, ParameterField } from '~/api/utils/api-requests';
import { COMPARISON_TYPES, getTypeByDataType } from '~/components/checks/checks.utils';
import { getSchema } from '~/components/forms/check/parameter-check/parameter-check-form.schema';
import { FormAutocomplete, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks';
import { positiveIntegerRe } from '~/utils/validation/utils/regexp';

interface ParameterCheckFormProps {
  parameters: ParameterField[];
  leftValue: ParameterField;
  onReject?: () => void;
  onResolve: (values: Check) => void;
}

export interface ParameterCheckFormData {
  opCode: CheckOpcode;
  rightValue: { id: string; name: string };
}

export const ParameterCheckForm: FC<ParameterCheckFormProps> = ({
  parameters,
  leftValue,
  onResolve,
  onReject,
}) => {
  const { t, translateCheckOperatorType, translateStringCheckOperatorType } =
    useCustomTranslations();

  const schema = getSchema(leftValue, t);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ParameterCheckFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const opCodeData = watch('opCode');

  const isStringCompared =
    COMPARISON_TYPES.includes(opCodeData) && leftValue.type === DataType.String;

  const rightValueData = useMemo(
    () =>
      isStringCompared
        ? parameters.filter(
            param =>
              [DataType.Int, DataType.String].includes(param.type) && param.id !== leftValue.id,
          )
        : parameters.filter(param => param.type === leftValue.type && param.id !== leftValue.id),
    [isStringCompared, parameters, leftValue],
  );

  const handleAddCheck = (values: ParameterCheckFormData) => {
    if (isStringCompared) {
      const formLeftValue = {
        '@type': 'StringLengthValue',
        value: {
          '@type': 'ColumnValue',
          value: leftValue.id,
        },
      };

      const rightValue = positiveIntegerRe.test(values.rightValue.name)
        ? {
            '@type': 'IntConst',
            value: Number(values.rightValue.name),
          }
        : {
            '@type': 'StringLengthValue',
            value: {
              '@type': 'ColumnValue',
              value: values.rightValue,
            },
          };
      //@ts-expect-error rightValue typing
      onResolve({ leftValue: formLeftValue, opCode: values.opCode, rightValue });
    } else {
      const formLeftValue = {
        '@type': 'ColumnValue',
        value: leftValue.id,
      };

      const rightValue = getRightValue(
        leftValue.type,
        parameters,
        values.rightValue,
        values.opCode,
      );

      //@ts-expect-error rightValue typing
      onResolve({ leftValue: formLeftValue, opCode: values.opCode, rightValue });
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleAddCheck)} showColonAfterLabel isRequired>
      <FormItem label={t('CHECKS.LEFT_VALUE')} isDisabled>
        <InputText value={leftValue.name} />
      </FormItem>
      <FormItem label={t('CHECKS.OPERATOR')}>
        <FormSelect
          items={Object.values(CheckOpcode)}
          translateItemsFunction={
            isStringCompared ? translateStringCheckOperatorType : translateCheckOperatorType
          }
          controllerProps={{ ...register('opCode'), control }}
        />
      </FormItem>
      <FormItem label={t('CHECKS.RIGHT_VALUE')}>
        <FormAutocomplete
          items={rightValueData}
          controllerProps={{ ...register('rightValue'), control }}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
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

function getRightValue(
  leftValueType: DataType,
  parameters: ParameterField[],
  input: ParameterCheckFormData['rightValue'],
  op: CheckOpcode,
) {
  if (parameters.some(column => column === input)) {
    return {
      '@type': 'ColumnValue',
      value: input['id'],
    };
  }

  if (op === CheckOpcode.MATCH) {
    return {
      '@type': 'StringConst',
      value: input['name'],
    };
  }

  if (op === CheckOpcode.IN) {
    const possibleValues = input['name'].split(',');
    return possibleValues.map(value => {
      return {
        '@type': getTypeByDataType(leftValueType),
        value: leftValueType === DataType.String ? value.trim() : Number(value),
      };
    });
  }
  return {
    '@type': getTypeByDataType(leftValueType),
    value: input['name'],
  };
}
