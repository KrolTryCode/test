import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { PhoneInput } from '~/components/phone-input/phone-input.component';
import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';

interface FormInputPhoneProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormInputPhone<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
}: FormInputPhoneProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const handleChange = (value: string) => {
    field.onChange(value);
  };

  return (
    <ValidationError {...fieldState}>
      <PhoneInput
        value={field.value || ''}
        error={fieldState.invalid}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
    </ValidationError>
  );
}
