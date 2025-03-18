import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem, InputText } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Check, CheckOpcode, DataType, ParameterField } from '~/api/utils/api-requests';
import { COMPARISON_TYPES, getTypeByDataType } from '~/components/checks/checks.utils';
import { schema } from '~/components/forms/check/parameter-check/parameter-check-form.schema';
import { FormAutocomplete, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks';

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
  const { t, translateCheckOperatorType } = useCustomTranslations();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ParameterCheckFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const handleAddCheck = (values: ParameterCheckFormData) => {
    const leftValueType = leftValue.type;
    if (leftValueType === DataType.String && COMPARISON_TYPES.includes(values.opCode)) {
      const formLeftValue = {
        '@type': 'StringLengthValue',
        value: {
          '@type': 'StringConst',
          value: leftValue.id,
        },
      };

      const rightValue = {
        '@type': 'StringLengthValue',
        value: getRightValue(leftValueType, parameters, values.rightValue, values.opCode),
      };

      onResolve({ leftValue: formLeftValue, opCode: values.opCode, rightValue });
    } else {
      const formLeftValue = {
        '@type': 'ColumnValue',
        value: leftValue.id,
      };

      const rightValue = getRightValue(leftValueType, parameters, values.rightValue, values.opCode);

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
          translateItemsFunction={translateCheckOperatorType}
          controllerProps={{ ...register('opCode'), control }}
        />
      </FormItem>
      <FormItem label={t('CHECKS.RIGHT_VALUE')}>
        <FormAutocomplete
          items={parameters.filter(value => value !== leftValue)}
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
