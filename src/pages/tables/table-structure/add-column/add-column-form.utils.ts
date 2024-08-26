import { ColumnDefinitionColumnTypeEnum } from '~/api/utils/api-requests';

export const selectColumnTypes = Object.entries(ColumnDefinitionColumnTypeEnum).map(
  ([id, name]) => ({ id, name }),
);
