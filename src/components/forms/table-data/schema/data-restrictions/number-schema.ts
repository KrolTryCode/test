import { t } from 'i18next';
import * as y from 'yup';

import { CheckOpcode, TableCheck, TableColumn } from '~/api/utils/api-requests';
import {
  getRightOrLeftValue,
  isColumnValueType,
} from '~/components/forms/table-data/schema/data-restrictions/utils';

const getValuesFromContext = (context: y.TestContext, check: TableCheck) => {
  const { rightValue, leftValue } = check.check;

  let leftVal: string;
  let rightVal: string;

  if (isColumnValueType(leftValue)) {
    leftVal = context.parent[leftValue?.['value'] as string] as string;
  } else {
    leftVal = getRightOrLeftValue(leftValue?.['value'] as string) as string;
  }

  if (isColumnValueType(rightValue)) {
    rightVal = context.parent[rightValue['value'] as string] as string;
  } else {
    rightVal = getRightOrLeftValue(rightValue['value'] as string) as string;
  }
  return { leftVal, rightVal };
};

const getAdditionalInfoIfColumnValue = (check: TableCheck, columns: TableColumn[]) => {
  const { rightValue, leftValue } = check.check;
  let additionalTextRightColName;
  let additionalTextLeftColName;
  if (isColumnValueType(rightValue) && isColumnValueType(leftValue)) {
    additionalTextLeftColName = findColumn(columns, leftValue?.['value'] as string)?.displayName;
    additionalTextRightColName = findColumn(columns, rightValue['value'] as string)?.displayName;
  }

  return { additionalTextLeftColName, additionalTextRightColName };
};

const getNumValues = ({ leftVal, rightVal }: { leftVal: string; rightVal: string }) => {
  return { leftValNum: Number(leftVal), rightValNum: Number(rightVal) };
};

const findColumn = (columns: TableColumn[], colId: string) => columns.find(el => el.id === colId);

export const numberDataRestrictionsSchema = (checks: TableCheck[], columns: TableColumn[]) => {
  let schema = y.number();
  checks.forEach(check => {
    const { opCode, rightValue } = check.check;
    const value = Number(getRightOrLeftValue(rightValue.value));
    const { additionalTextRightColName, additionalTextLeftColName } =
      getAdditionalInfoIfColumnValue(check, columns);

    switch (opCode) {
      case CheckOpcode.GT:
        schema = schema.test(
          'number-gt',
          t('CHECKS.NUMBER_TYPE.GT', {
            what: additionalTextRightColName ?? value,
            value: additionalTextLeftColName,
          }),
          (_val, context) => {
            const { leftValNum, rightValNum } = getNumValues(getValuesFromContext(context, check));
            return !!leftValNum && leftValNum > rightValNum;
          },
        );
        break;
      case CheckOpcode.GE:
        schema = schema.test(
          'number-ge',
          t('CHECKS.NUMBER_TYPE.GE', {
            what: additionalTextRightColName ?? value,
            value: additionalTextLeftColName,
          }),
          (_val, context) => {
            const { leftValNum, rightValNum } = getNumValues(getValuesFromContext(context, check));
            return !!leftValNum && leftValNum >= rightValNum;
          },
        );
        break;
      case CheckOpcode.LT:
        schema = schema.test(
          'number-lt',
          t('CHECKS.NUMBER_TYPE.LT', {
            what: additionalTextRightColName ?? value,
            value: additionalTextLeftColName,
          }),
          (_val, context) => {
            const { leftValNum, rightValNum } = getNumValues(getValuesFromContext(context, check));
            return !!leftValNum && leftValNum < rightValNum;
          },
        );
        break;
      case CheckOpcode.LE:
        schema = schema.test(
          'number-le',
          t('CHECKS.NUMBER_TYPE.LE', {
            what: additionalTextRightColName ?? value,
            value: additionalTextLeftColName,
          }),
          (_val, context) => {
            const { leftValNum, rightValNum } = getNumValues(getValuesFromContext(context, check));
            return !!leftValNum && leftValNum <= rightValNum;
          },
        );
        break;
      case CheckOpcode.NEQ:
        schema = schema.test(
          'number-neq',
          t('CHECKS.NUMBER_TYPE.NEQ', {
            what: additionalTextRightColName ?? value,
            value: additionalTextLeftColName,
          }),
          (_val, context) => {
            const { leftValNum, rightValNum } = getNumValues(getValuesFromContext(context, check));
            return !!leftValNum && leftValNum !== rightValNum;
          },
        );
        break;
      case CheckOpcode.IN:
        // TODO Fix app backend https://gitlab.spbpu.com/customprojects/indanis/app/-/merge_requests/149
        //if (Array.isArray(rightValue)) {
        //  schema = schema.test(
        //    'number-in-array',
        //    `Значение должно быть одним из значений: ${rightVal.join(', ')}`,
        //    value => !value || rightValue.includes(value.length),
        //  );
        //}
        break;
      case CheckOpcode.MATCH:
        break;
    }
  });

  return schema;
};
