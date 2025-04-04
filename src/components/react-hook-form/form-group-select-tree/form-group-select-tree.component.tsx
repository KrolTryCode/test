import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';
import { GroupSelectTree } from '~/components/trees/app-group-select-tree/app-group-select-tree.component';

interface FormGroupSelectTreeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  onSelect?: (nodeId: string) => void;
}

export function FormGroupSelectTree<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  onSelect,
}: FormGroupSelectTreeProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const handleSelect = (value: string) => {
    field.onChange(value);
    onSelect?.(value);
    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <GroupSelectTree value={field.value} onChange={handleSelect} />
    </ValidationError>
  );
}
