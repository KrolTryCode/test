import { CheckOpcode, DataType } from '~/api/utils/api-requests';

export const COMPARISON_TYPES = [CheckOpcode.GE, CheckOpcode.GT, CheckOpcode.LT, CheckOpcode.LE];
export const ALLOWED_TYPES = [DataType.Int, DataType.Float, DataType.String];

export function getTypeByDataType(dataType?: DataType) {
  switch (dataType) {
    case DataType.Int:
      return 'IntConst';
    case DataType.Float:
      return 'FloatConst';
    case DataType.String:
      return 'StringConst';
    case DataType.Boolean:
    case DataType.Timestamp:
    case DataType.Date:
    case DataType.LineString:
    case DataType.Point:
    case DataType.Polygon:
    case DataType.Uuid:
    case undefined:
    default:
      return 'unknown';
  }
}
