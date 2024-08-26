import { ColumnMetadata, TableMetadata } from '~/api/utils/api-requests';

export interface ColumnMetadataWithId extends ColumnMetadata {
  id: string;
}

export const selectNodeColumns = (data: TableMetadata): ColumnMetadataWithId[] => {
  return data.columnsMetadata.map((item, index) => ({ ...item, id: String(index) }));
};
