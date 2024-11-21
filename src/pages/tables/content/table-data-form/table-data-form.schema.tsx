import * as y from 'yup';

import { ColumnMetadata, ColumnType } from '~/api/utils/api-requests';

export const getSchema = (properties: ColumnMetadata[]) =>
  y.object().shape(
    Object.fromEntries(
      properties.map(prop => {
        switch (prop.type) {
          case ColumnType.Double:
            return [prop.name, y.number().notRequired()];
          case ColumnType.Integer:
            return [prop.name, y.number().integer().notRequired()];
          case ColumnType.Boolean:
            return [prop.name, y.boolean().notRequired()];
          case ColumnType.Timestamp:
          case ColumnType.Date:
          case ColumnType.Geometry:
          case ColumnType.UUID:
          case ColumnType.Varchar:
          default:
            return [prop.name, y.string().notRequired()];
        }
      }),
    ),
  );
