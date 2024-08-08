import { useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';
import { DateTimePicker } from '~/ui-components/date-time-picker/date-time-picker.component';
import { DateTimePickerProps } from '~/ui-components/date-time-picker/date-time-picker.type';

interface FormDateTimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Partial<DateTimePickerProps> {
  controllerProps: UseControllerProps<TFieldValues, TName> & { ref: unknown };
}

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
      const newValue = value ?? undefined;

      field.onChange(newValue);
      pickerProps.onChange?.(newValue ?? null);
      field.onBlur();
    },
    [field, pickerProps],
  );

  return (
    <ValidationError {...fieldState}>
      <DateTimePicker
        {...field}
        {...pickerProps}
        value={field.value ?? null}
        inputRef={ref}
        onChange={onChange}
        invalid={fieldState.invalid}
      />
    </ValidationError>
  );
}
