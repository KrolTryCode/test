import { Autocomplete, AutocompleteProps } from '@pspod/ui-components';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '../_validation-error/validation-error.component';

type FormAutocompleteProps<
  T extends Record<string, any>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<AutocompleteProps<T>> & {
  items: AutocompleteProps<T>['items'];
  controllerProps: UseControllerProps<TFieldValues, TName>;
};

export const FormAutocomplete = <
  T extends Record<string, any>,
  TFieldValues extends FieldValues = FieldValues,
>({
  controllerProps,
  ...autocompleteProps
}: FormAutocompleteProps<T, TFieldValues, FieldPath<TFieldValues>>) => {
  const { field, fieldState } = useController(controllerProps);

  const handleChange = (value: T) => {
    field.onChange(value);
    autocompleteProps.onChange?.(value);
  };

  return (
    <ValidationError {...fieldState} placement={'top'}>
      <Autocomplete
        {...autocompleteProps}
        invalid={fieldState.invalid}
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
    </ValidationError>
  );
};
