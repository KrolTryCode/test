import { GridColType } from '@mui/x-data-grid-premium';

import { DataType } from '~/api/utils/api-requests';

export function getGridColumnType(type: DataType): GridColType {
  switch (type) {
    case DataType.Boolean: {
      return 'boolean';
    }
    case DataType.Timestamp: {
      return 'dateTime';
    }
    case DataType.Date: {
      return 'date';
    }
    case DataType.Int:
    case DataType.Float: {
      return 'number';
    }
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.Uuid:
    case DataType.String:
    default:
      return 'string';
  }
}
