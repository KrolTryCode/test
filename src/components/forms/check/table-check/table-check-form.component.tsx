import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Check, CheckOpcode, DataType, TableColumn } from '~/api/utils/api-requests';
import { COMPARISON_TYPES, getTypeByDataType } from '~/components/checks/checks.utils';
import { getSchema } from '~/components/forms/check/table-check/table-check-form.schema';
import { FormAutocomplete, FormSelect } from '~/components/react-hook-form';
import { useCustomTranslations } from '~/utils/hooks';
import { positiveIntegerRe } from '~/utils/validation/utils/regexp';

interface TableCheckFormProps {
  columns: TableColumn[];
  onReject?: () => void;
  onResolve: (values: Check) => void;
}

export interface TableCheckFormData {
  opCode: CheckOpcode;
  leftValue: string;
  rightValue: { id: string; displayName: string };
}

export const TableCheckForm: FC<TableCheckFormProps> = ({ columns, onResolve, onReject }) => {
  const { t, translateCheckOperatorType, translateStringCheckOperatorType } =
    useCustomTranslations();

  const schema = getSchema(columns, t);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<TableCheckFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const leftValueData = watch('leftValue');
  const opCodeData = watch('opCode');

  const leftValueType = useMemo(
    () => columns.find(column => column.id === leftValueData)?.type,
    [columns, leftValueData],
  );

  const isStringCompared =
    COMPARISON_TYPES.includes(opCodeData) && leftValueType === DataType.String;

  const rightValueData = useMemo(
    () =>
      isStringCompared
        ? columns.filter(
            column =>
              [DataType.Int, DataType.String].includes(column.type) && column.id !== leftValueData,
          )
        : columns.filter(column => column.type === leftValueType && column.id !== leftValueData),
    [isStringCompared, columns, leftValueType, leftValueData],
  );

  const handleAddCheck = (values: TableCheckFormData) => {
    const leftValueType = columns.find(column => column.id === values.leftValue)?.type;

    if (isStringCompared) {
      const leftValue = {
        '@type': 'StringLengthValue',
        value: {
          '@type': 'ColumnValue',
          value: values.leftValue,
        },
      };

      const rightValue = positiveIntegerRe.test(values.rightValue.displayName)
        ? {
            '@type': 'IntConst',
            value: Number(values.rightValue.displayName),
          }
        : {
            '@type': 'StringLengthValue',
            value: {
              '@type': 'ColumnValue',
              value: values.rightValue,
            },
          };
      //@ts-expect-error rightValue typing
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
          translateItemsFunction={
            isStringCompared ? translateStringCheckOperatorType : translateCheckOperatorType
          }
          controllerProps={{ ...register('opCode'), control }}
        />
      </FormItem>
      <FormItem label={t('CHECKS.RIGHT_VALUE')}>
        <FormAutocomplete
          items={rightValueData}
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
  input: TableCheckFormData['rightValue'],
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
