import { GridRowId, useGridApiContext } from '@mui/x-data-grid-premium';
import { DateTimePicker } from '@mui/x-date-pickers-pro';
import { FC } from 'react';

interface DateTimeEditingCellProps {
  id: GridRowId;
  field: string;
  value: Date | null;
  isClearable?: boolean;
  disablePast?: boolean;
}

export const DateTimeEditingCell: FC<DateTimeEditingCellProps> = ({
  field,
  id,
  value,
  isClearable,
  ...props
}) => {
  const apiRef = useGridApiContext();

  const handleChange = (newValue: Date | null) => {
    if (apiRef.current) {
      void apiRef.current.setEditCellValue({ id, field, value: newValue });
    }
  };

  return (
    <DateTimePicker
      value={value}
      onChange={handleChange}
      slotProps={{
        textField: {
          variant: 'standard',
          style: { width: '100%' },
          InputProps: {
            disableUnderline: true,
            style: { fontSize: 14, outline: 'none', padding: '10px', width: '100%' },
          },
        },
        actionBar: {
          actions: isClearable ? ['clear'] : [],
        },
      }}
      {...props}
    />
  );
};
