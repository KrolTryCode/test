import { InputText, InputTextProps } from '@pspod/ui-components';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

import { MaskedInput } from './masked-input/masked-input.component';

interface FormInputTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Partial<InputTextProps> {
  mask?: string;
  definitions?: Record<string, RegExp>;
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormInputText<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  mask,
  ...inputProps
}: FormInputTextProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);
  const InputComponent = mask ? MaskedInput : InputText;

  const handleChange = (value: string) => {
    field.onChange(value);
    inputProps.onChange?.(value);
  };

  return (
    <ValidationError {...fieldState}>
      <InputComponent
        {...inputProps}
        invalid={fieldState.invalid}
        value={field.value || ''}
        onChange={handleChange}
        onBlur={field.onBlur}
        mask={mask!}
      />
    </ValidationError>
  );
}
