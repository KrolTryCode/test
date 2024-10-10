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
  maxDate,
  className,
  inputRef,
  invalid,
  showClearButton,
  views,
  fullWidth = true,
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
    fullWidth,
    onChange: handleValueChange,
    disabled: isDisabled,
    readOnly: !onChange,
    className,
    inputRef,
    format,
    value,
    views,
  };

  switch (type) {
    case 'datetime':
      return (
        <MuiDateTimePicker
          {...commonProps}
          minDateTime={minDate}
          maxDate={maxDate}
          showDaysOutsideCurrentMonth
        />
      );
    case 'date':
      return (
        // @ts-expect-error views type
        <MuiDatePicker
          {...commonProps}
          minDate={minDate}
          maxDate={maxDate}
          showDaysOutsideCurrentMonth
        />
      );
    case 'time':
      // @ts-expect-error views type
      return <MuiTimePicker {...commonProps} minTime={minDate} maxTime={maxDate} />;
  }
};
