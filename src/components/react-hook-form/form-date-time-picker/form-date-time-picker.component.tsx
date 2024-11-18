import { DateTimePicker, DateTimePickerProps } from '@pspod/ui-components';
import { useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { getCurrentUserTimezone } from '~/app/user/user.store';
import { getColDateWithTz } from '~/utils/datagrid/get-col-date-with-tz';
import { applyTzOffsetToSystemDate } from '~/utils/date/apply-tz-offset';

import { ValidationError } from '../_validation-error/validation-error.component';

type FormDateTimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<DateTimePickerProps> & {
  controllerProps: UseControllerProps<TFieldValues, TName> & { ref: unknown };
};

export function FormDateTimePicker<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  ...pickerProps
}: FormDateTimePickerProps<TFieldValues, FieldPath<TFieldValues>>) {
  const {
    field: { ref, ...field },
    fieldState,
  } = useController(controllerProps);

  const onChange = useCallback(
    (value: Date | null) => {
      const userTz = getCurrentUserTimezone();
      const updVal = value ? applyTzOffsetToSystemDate(value, userTz) : value;
      field.onChange(updVal);
      field.onBlur();
    },
    [field],
  );

  return (
    <ValidationError {...fieldState} fullWidth={pickerProps.fullWidth}>
      <DateTimePicker
        {...field}
        {...pickerProps}
        value={field.value ? (getColDateWithTz(field.value) as Date) : null}
        inputRef={ref}
        onChange={onChange}
        invalid={fieldState.invalid}
      />
    </ValidationError>
  );
}
