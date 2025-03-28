import * as y from 'yup';

import { DataType, TableCheck, TableColumn } from '~/api/utils/api-requests';
import { numberDataRestrictionsSchema } from '~/components/forms/table-data/schema/data-restrictions/number-schema';
import { stringDataRestrictionsSchema } from '~/components/forms/table-data/schema/data-restrictions/string-schema';

const buildPropSchema = (
  prop: TableColumn,
  tableContent: Record<string, string | number | boolean | null | undefined>[],
  checks: TableCheck[],
  columns: TableColumn[],
) => {
  let schema: y.AnySchema;

  switch (prop.type) {
    case DataType.String:
      schema = stringDataRestrictionsSchema(checks);
      break;
    case DataType.Int:
      schema = numberDataRestrictionsSchema(checks, columns).integer();
      break;
    case DataType.Float:
      schema = numberDataRestrictionsSchema(checks, columns);
      break;
    case DataType.Boolean:
      schema = y.boolean();
      break;
    case DataType.Timestamp:
    case DataType.Date:
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.Uuid:
    default:
      schema = y.string();
      break;
  }

  if (prop.unique) {
    schema = schema.test({
      name: 'is-unique',
      test: (value: string | number | boolean | null | undefined, ctx) => {
        const forbiddenValues = tableContent
          ?.filter(row => row.id !== ctx.parent.id && row[prop.id])
          .map(row => row[prop.id]);

        const isEmpty = value === null || value === undefined || value === '';
        if (!isEmpty && forbiddenValues.includes(value)) {
          return ctx.createError({
            message: { key: 'yup:mixed.notOneOf', values: { values: forbiddenValues } },
          });
        }

        return true;
      },
    });
  }

  if (!prop.nullable) {
    schema = schema.required() as y.AnySchema;
  }

  return schema;
};

export const getSchema = (
  columns: TableColumn[],
  tableContent: Record<string, any>[],
  checks: TableCheck[],
) => {
  const shape = columns.reduce(
    (acc, prop) => {
      acc[prop.id] = buildPropSchema(prop, tableContent, checks, columns);
      return acc;
    },
    {} as Record<string, any>,
  );

  return y.object().shape(shape);
};
