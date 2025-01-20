import { TableColumn, Table } from '~/api/utils/api-requests';

export interface TableColumnExtended extends TableColumn {
  __reorder__: string;
}

export const selectNodeColumns = (data: Table): TableColumnExtended[] => {
  return data.columns.map(item => ({
    ...item,
    __reorder__: item.name,
  }));
};
