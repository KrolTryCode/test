import {
  ColumnValue,
  Const,
  FloatConst,
  IntConst,
  StringConst,
  StringLengthValue,
} from '~/api/utils/api-requests';

export const isColumnValueType = (value: any) => {
  return '@type' in value && value['@type'] === 'ColumnValue';
};

export const getRightOrLeftValue = (
  currentObject:
    | string
    | object
    | ColumnValue
    | Const
    | StringLengthValue
    | FloatConst
    | IntConst
    | StringConst,
) => {
  let value: object | string;
  if (typeof currentObject === 'object' && 'value' in currentObject) {
    value = currentObject.value;
  } else {
    value = currentObject;
  }
  return value;
};
