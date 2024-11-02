import { DateTimePicker, DateTimePickerProps } from '@pspod/ui-components';
import { useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

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
      field.onChange(value);
      pickerProps.onChange?.(value);
      field.onBlur();
    },
    [field, pickerProps],
  );

  return (
    <ValidationError {...fieldState} fullWidth={pickerProps.fullWidth}>
      <DateTimePicker
        {...field}
        {...pickerProps}
        value={field.value ? new Date(field.value) : null}
        inputRef={ref}
        onChange={onChange}
        invalid={fieldState.invalid}
      />
    </ValidationError>
  );
}
