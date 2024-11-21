import { GridColType } from '@mui/x-data-grid-premium';

import { ColumnType } from '~/api/utils/api-requests';

export function getGridColumnType(type: ColumnType): GridColType {
  switch (type) {
    case ColumnType.Boolean: {
      return 'boolean';
    }
    case ColumnType.Timestamp: {
      return 'dateTime';
    }
    case ColumnType.Date: {
      return 'date';
    }
    case ColumnType.Integer:
    case ColumnType.Double: {
      return 'number';
    }
    case ColumnType.UUID:
    case ColumnType.Geometry:
    case ColumnType.Varchar:
    default:
      return 'string';
  }
}
