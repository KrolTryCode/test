import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';

import { SearchTree, SearchTreeProps } from './search-tree.component';

interface FormSearchTreeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<SearchTreeProps, 'onSelect' | 'onBlur' | 'error' | 'value'> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormSearchTree<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  ...props
}: FormSearchTreeProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const handleSelect = (value: string) => {
    field.onChange(value);
    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <SearchTree
        {...props}
        value={field.value}
        error={fieldState.invalid}
        onBlur={field.onBlur}
        onSelect={handleSelect}
      />
    </ValidationError>
  );
}
