import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Select } from '~/ui-components/select/select.component';
import { SelectProps } from '~/ui-components/select/select.type';

import { ValidationError } from '../_validation-error/validation-error.component';

type FormSelectProps<
  T extends Record<string, any>,
  Multiple extends boolean | undefined = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<SelectProps<T, Multiple>> & {
  items: SelectProps<T, Multiple>['items'];
  controllerProps: UseControllerProps<TFieldValues, TName>;
};

export function FormSelect<
  T extends Record<string, any>,
  Multiple extends boolean | undefined = false,
  TFieldValues extends FieldValues = FieldValues,
>({
  controllerProps,
  ...selectProps
}: FormSelectProps<T, Multiple, TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const onChange: SelectProps<T, Multiple>['onChange'] = value => {
    field.onChange(value);
    selectProps.onChange?.(value);
  };

  return (
    <ValidationError {...fieldState} placement={'top'}>
      <Select
        {...selectProps}
        error={fieldState.invalid}
        value={field.value}
        onChange={onChange}
        onBlur={field.onBlur}
      />
    </ValidationError>
  );
}
