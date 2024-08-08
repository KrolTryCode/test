import { Checkbox, FormControlLabel } from '@mui/material';
import { SyntheticEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  label?: string;
  isDisabled?: boolean;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormCheckbox<TFieldValues extends FieldValues = FieldValues>({
  label,
  isDisabled,
  size,
  color,
  controllerProps,
}: FormCheckboxProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const valueChangedHandler = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
    field.onChange(checked);
  };

  return (
    <ValidationError {...fieldState}>
      <FormControlLabel
        control={<Checkbox disableRipple size={size} color={!fieldState.error ? color : 'error'} />}
        label={label}
        disabled={isDisabled}
        checked={field.value || false}
        onChange={valueChangedHandler}
      />
    </ValidationError>
  );
}
