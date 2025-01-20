import * as y from 'yup';

import { DataType, TableColumn } from '~/api/utils/api-requests';

export const getSchema = (properties: TableColumn[]) =>
  y.object().shape(
    Object.fromEntries(
      properties.map(prop => {
        switch (prop.type) {
          case DataType.Float:
            return [prop.id, y.number().notRequired()];
          case DataType.Int:
            return [prop.id, y.number().integer().notRequired()];
          case DataType.Boolean:
            return [prop.id, y.boolean().notRequired()];
          case DataType.Timestamp:
          case DataType.Date:
          case DataType.LineString:
          case DataType.Point:
          case DataType.Polygon:
          case DataType.Uuid:
          case DataType.String:
          default:
            return [prop.id, y.string().notRequired()];
        }
      }),
    ),
  );
