import * as y from 'yup';

import { DataType, TableColumn } from '~/api/utils/api-requests';

const buildPropSchema = (
  prop: TableColumn,
  tableContent: Record<string, string | number | boolean | null | undefined>[],
) => {
  let schema: y.AnySchema;
  switch (prop.type) {
    case DataType.Float:
      schema = y.number();
      break;
    case DataType.Int:
      schema = y.number().integer();
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
    case DataType.String:
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

export const getSchema = (properties: TableColumn[], tableContent: Record<string, any>[]) => {
  const shape = properties.reduce(
    (acc, prop) => {
      acc[prop.id] = buildPropSchema(prop, tableContent);
      return acc;
    },
    {} as Record<string, any>,
  );

  return y.object().shape(shape);
};
