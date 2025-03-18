import {
  ParameterField,
  ParameterFieldCheck,
  TableCheck,
  TableColumn,
} from '~/api/utils/api-requests';

export type CheckType = TableCheck | ParameterFieldCheck;
export type CheckParentType = TableColumn | ParameterField;
