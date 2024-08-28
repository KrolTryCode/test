import { ColumnMetadata, TableMetadata } from '~/api/utils/api-requests';

export interface ColumnMetadataExtended extends ColumnMetadata {
  id: string;
  __reorder__: string;
}

export const selectNodeColumns = (data: TableMetadata): ColumnMetadataExtended[] => {
  return data.columnsMetadata.map((item, index) => ({
    ...item,
    id: String(index),
    __reorder__: item.name,
  }));
};
