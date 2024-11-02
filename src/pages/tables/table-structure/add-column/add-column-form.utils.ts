import { ColumnType } from '~/api/utils/api-requests';

export const selectColumnTypes = Object.entries(ColumnType).map(([id, name]) => ({ id, name }));
