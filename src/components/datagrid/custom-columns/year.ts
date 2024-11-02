import { GridValidRowModel } from '@mui/x-data-grid-premium';
import { EnhancedColDef } from '@pspod/ui-components';

export const getYearColDef = <T extends GridValidRowModel = any>(
  options: Omit<EnhancedColDef<T>, 'type'>,
) => {
  return {
    type: 'number',
    headerAlign: 'left',
    minWidth: 150,
    valueGetter: value => {
      if (value) {
        return new Date(value).getFullYear();
      }
    },
    groupingValueGetter(value) {
      if (value) {
        return new Date(value).getFullYear().toString();
      }
      return '';
    },
    ...options,
  } as EnhancedColDef<T>;
};
