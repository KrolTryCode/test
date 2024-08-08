import {
  DateTimePicker as MuiDateTimePicker,
  TimePicker as MuiTimePicker,
  DatePicker as MuiDatePicker,
} from '@mui/x-date-pickers-pro';
import { FC, useCallback } from 'react';

import { DateTimePickerProps } from './date-time-picker.type';

export const DateTimePicker: FC<DateTimePickerProps> = ({
  value,
  onChange,
  onBlur,
  type = 'date',
  variant = 'outlined',
  format,
  isDisabled = false,
  minDate,
  className,
  inputRef,
  invalid,
  showClearButton,
}) => {
  const handleValueChange = useCallback(
    (value: Date | null) => {
      onChange?.(value);
    },
    [onChange],
  );

  const textFieldProps = {
    onBlur,
    variant,
    size: 'small',
    value,
    error: invalid,
  } as const;

  const commonProps = {
    slotProps: {
      textField: textFieldProps,
      field: { clearable: showClearButton },
    },
    onChange: handleValueChange,
    disabled: isDisabled,
    readOnly: !onChange,
    className,
    inputRef,
    format,
    value,
  };

  switch (type) {
    case 'datetime':
      return (
        <MuiDateTimePicker {...commonProps} minDateTime={minDate} showDaysOutsideCurrentMonth />
      );
    case 'date':
      return <MuiDatePicker {...commonProps} minDate={minDate} showDaysOutsideCurrentMonth />;
    case 'time':
      return <MuiTimePicker {...commonProps} minTime={minDate} />;
  }
};
