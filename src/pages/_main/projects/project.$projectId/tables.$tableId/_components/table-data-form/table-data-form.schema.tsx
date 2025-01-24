import * as y from 'yup';

import { DataType, TableColumn } from '~/api/utils/api-requests';

export const getSchema = (properties: TableColumn[], tableContent: Record<string, any>[]) =>
  y.object().shape(
    Object.fromEntries(
      properties.map(prop => {
        const isRequired = !prop.nullable;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const forbiddenValues = prop.unique ? tableContent?.map(row => row[prop.id]) : [];
        switch (prop.type) {
          case DataType.Float:
            return [
              prop.id,
              y
                .number()
                .when(() =>
                  (isRequired ? y.number().required() : y.number().notRequired()).notOneOf(
                    forbiddenValues,
                  ),
                ),
            ];
          case DataType.Int:
            return [
              prop.id,
              y
                .number()
                .when(() =>
                  (isRequired ? y.number().required() : y.number().notRequired())
                    .integer()
                    .notOneOf(forbiddenValues),
                ),
            ];
          case DataType.Boolean:
            return [
              prop.id,
              y
                .boolean()
                .when(() =>
                  (isRequired ? y.boolean().required() : y.boolean().notRequired()).notOneOf(
                    forbiddenValues,
                  ),
                ),
            ];
          case DataType.Timestamp:
          case DataType.Date:
          case DataType.LineString:
          case DataType.Point:
          case DataType.Polygon:
          case DataType.Uuid:
          case DataType.String:
          default:
            return [
              prop.id,
              y
                .string()
                .when(() =>
                  (isRequired ? y.string().required() : y.string().notRequired()).notOneOf(
                    forbiddenValues,
                  ),
                ),
            ];
        }
      }),
    ),
  );
