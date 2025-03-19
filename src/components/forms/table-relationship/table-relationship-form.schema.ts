import * as y from 'yup';

import { DataType, TableColumnLink, TableColumnLinkType } from '~/api/utils/api-requests';
import { UUIDSchema } from '~/utils/validation/schemas';

export interface ColumnInfo {
  id: string;
  tableId: string;
  type?: DataType | null;
}

export interface ITableRelationshipForm extends Pick<TableColumnLink, 'type'> {
  parent: ColumnInfo;
  child: ColumnInfo;
  swapped: boolean;
}

const columnInfoSchema: y.ObjectSchema<ColumnInfo> = y.object({
  id: UUIDSchema.required().default(''),
  tableId: UUIDSchema.required().default(''),
  type: y.string().oneOf(Object.values(DataType)).nullable(),
});

export const schema: y.ObjectSchema<ITableRelationshipForm> = y.object({
  parent: columnInfoSchema,
  child: columnInfoSchema,
  swapped: y.boolean().default(false),
  type: y
    .string()
    .oneOf(Object.values(TableColumnLinkType), { key: 'yup:mixed.required' })
    .required()
    .default(TableColumnLinkType.OneToOne),
});
