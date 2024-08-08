import { GridFilterInputDateProps } from '@mui/x-data-grid-premium';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers-pro';
import { FC, useCallback } from 'react';

export type GridCustomDateTimeFilterProps = GridFilterInputDateProps & {
  pickerType: 'date' | 'dateTime';
};

export const GridCustomDateTimeFilter: FC<GridCustomDateTimeFilterProps> = ({
  apiRef,
  applyValue,
  item,
  pickerType,
}) => {
  const getDateOrNull = useCallback((value?: Date | string | null) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    return isNaN(date.valueOf()) ? null : date;
  }, []);

  const value = getDateOrNull(item?.value as string);

  const onFilterChange = (value: Date | null) => {
    const processedValue = convertFilterItemValueToInputValue(value, pickerType);
    applyValue({ ...item, value: processedValue });
  };

  switch (pickerType) {
    case 'dateTime':
      return (
        <DateTimePicker
          value={value}
          onChange={onFilterChange}
          label={apiRef.current.getLocaleText('filterPanelInputLabel')}
          slotProps={{ textField: { size: 'medium', variant: 'standard' } }}
        />
      );
    case 'date':
      return (
        <DatePicker
          value={value}
          onChange={onFilterChange}
          label={apiRef.current.getLocaleText('filterPanelInputLabel')}
          slotProps={{ textField: { size: 'medium', variant: 'standard' } }}
        />
      );
  }
};

// x-data-grid\node\components\panel\filterPanel\GridFilterInputDate.js
function convertFilterItemValueToInputValue(value: Date | null, inputType: 'date' | 'dateTime') {
  if (!value || isNaN(value.valueOf())) {
    return;
  }

  const dateCopy = new Date(value);
  // The date picker expects the date to be in the local timezone.
  // But .toISOString() converts it to UTC with zero offset.
  // So we need to subtract the timezone offset.
  dateCopy.setMinutes(dateCopy.getMinutes() - dateCopy.getTimezoneOffset());
  switch (inputType) {
    case 'dateTime': {
      return dateCopy.toISOString().substring(0, 19);
    }
    case 'date':
    default: {
      return dateCopy.toISOString().substring(0, 10);
    }
  }
}
