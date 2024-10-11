import { InputNumeric, InputNumericProps } from '@pspod/ui-components';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

interface AdaptedInputNumericProps extends Omit<InputNumericProps, 'value' | 'onChange'> {
  value?: number | null;
  onChange?: (value?: number | null) => void;
}

interface FormInputNumericProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Partial<AdaptedInputNumericProps> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormInputNumeric<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  ...inputProps
}: FormInputNumericProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const onChange = (value: string) => {
    const newValue = value && !Number.isNaN(value) ? +value : controllerProps.defaultValue ?? null;
    field.onChange(newValue);
    inputProps.onChange?.(newValue);
  };

  return (
    <ValidationError {...fieldState}>
      <InputNumeric
        {...inputProps}
        invalid={fieldState.invalid}
        value={field.value ?? ''}
        onChange={onChange}
        onBlur={field.onBlur}
      />
    </ValidationError>
  );
}
