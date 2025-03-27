import { DatePickerMultiInput, DatePickerMultiInputProps } from '@pspod/ui-components';
import { useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

type FormDatePickerMultiProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<DatePickerMultiInputProps> & {
  controllerProps: UseControllerProps<TFieldValues, TName> & { ref: unknown };
};

export function FormDatePickerMulti<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  ...pickerProps
}: FormDatePickerMultiProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const onChange = useCallback(
    (value: string[]) => {
      field.onChange(value ?? []);
      field.onBlur();
    },
    [field],
  );

  return (
    <ValidationError {...fieldState} fullWidth={pickerProps.width === '100%'}>
      <DatePickerMultiInput
        {...field}
        {...pickerProps}
        dates={field.value ?? []}
        onChange={onChange}
        invalid={fieldState.invalid}
      />
    </ValidationError>
  );
}
