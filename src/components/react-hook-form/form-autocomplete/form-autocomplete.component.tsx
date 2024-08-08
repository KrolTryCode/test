import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Autocomplete } from '~/ui-components/autocomplete/autocomplete.component';
import { AutocompleteProps } from '~/ui-components/autocomplete/autocomplete.type';

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

  return (
    <ValidationError {...fieldState} placement={'top'}>
      <Autocomplete
        {...autocompleteProps}
        invalid={fieldState.invalid}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </ValidationError>
  );
};
