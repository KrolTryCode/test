import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Check, CheckOpcode, DataType, TableColumn } from '~/api/utils/api-requests';
import { schema } from '~/components/forms/check/check-form.schema';
import { FormAutocomplete, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks';

interface CheckFormProps {
  columns: TableColumn[];
  onReject?: () => void;
  onResolve: (values: Check) => void;
}

export interface CheckFormData {
  opCode: CheckOpcode;
  leftValue: string;
  rightValue: { id: string; displayName: string };
}

const COMPARISON_TYPES = [CheckOpcode.GE, CheckOpcode.GT, CheckOpcode.LT, CheckOpcode.LE];

export const CheckForm: FC<CheckFormProps> = ({ columns, onResolve, onReject }) => {
  const { t, translateCheckOperatorType } = useCustomTranslations();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<CheckFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const handleAddCheck = (values: CheckFormData) => {
    const leftValueType = columns.find(column => column.id === values.leftValue)?.type;

    if (leftValueType === DataType.String && COMPARISON_TYPES.includes(values.opCode)) {
      const leftValue = {
        '@type': 'StringLengthValue',
        value: {
          '@type': 'StringConst',
          value: values.leftValue,
        },
      };

      const rightValue = {
        '@type': 'StringLengthValue',
        value: getRightValue(leftValueType, columns, values.rightValue, values.opCode),
      };

      onResolve({ leftValue, opCode: values.opCode, rightValue });
    } else {
      const leftValue = {
        '@type': 'ColumnValue',
        value: values.leftValue,
      };

      const rightValue = getRightValue(leftValueType!, columns, values.rightValue, values.opCode);

      //@ts-expect-error rightValue typing
      onResolve({ leftValue, opCode: values.opCode, rightValue });
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleAddCheck)} showColonAfterLabel isRequired>
      <FormItem label={t('CHECKS.LEFT_VALUE')}>
        <FormSelect
          items={columns}
          valueExpr={'databaseName'}
          displayExpr={'displayName'}
          controllerProps={{ ...register('leftValue'), control }}
        />
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
          items={columns}
          valueExpr={'databaseName'}
          displayExpr={'displayName'}
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
  columns: TableColumn[],
  input: CheckFormData['rightValue'],
  op: CheckOpcode,
) {
  if (columns.some(column => column === input)) {
    return {
      '@type': 'ColumnValue',
      value: input['id'],
    };
  }

  if (op === CheckOpcode.MATCH) {
    return {
      '@type': 'StringConst',
      value: input['displayName'],
    };
  }

  if (op === CheckOpcode.IN) {
    const possibleValues = input['displayName'].split(',');
    return possibleValues.map(value => {
      return {
        '@type': getTypeByDataType(leftValueType),
        value: leftValueType === DataType.String ? value.trim() : Number(value),
      };
    });
  }
  return {
    '@type': getTypeByDataType(leftValueType),
    value: input['displayName'],
  };
}

function getTypeByDataType(dataType?: DataType) {
  switch (dataType) {
    case DataType.Int:
      return 'IntConst';
    case DataType.Float:
      return 'FloatConst';
    case DataType.String:
      return 'StringConst';
    case DataType.Boolean:
    case DataType.Timestamp:
    case DataType.Date:
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.Uuid:
    case undefined:
    default:
      return 'unknown';
  }
}
