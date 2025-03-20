import { RealFullTaskInfo } from '~/api/queries/projects/tasks/get-project-task.query';
import { DataType, ParameterField } from '~/api/utils/api-requests';

export const parseDefaultValue = (
  param: Pick<ParameterField, 'defaultValue' | 'key' | 'type'>,
): undefined | RealFullTaskInfo['parameters']['params'][string] => {
  const shouldParse =
    ['contents', 'timestamp'].includes(param.key) ||
    [DataType.Timestamp, DataType.Int, DataType.Float, DataType.Boolean].includes(param.type);

  if (!shouldParse || !param.defaultValue) {
    return param.defaultValue;
  }

  return JSON.parse(
    param.defaultValue.toString(),
  ) as RealFullTaskInfo['parameters']['params'][typeof param.key];
};
