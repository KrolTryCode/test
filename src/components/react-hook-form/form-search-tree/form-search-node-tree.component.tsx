import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';
import { NodesTreeList } from '~/pages/_main/projects/project.$projectId/tables.$tableId/tree/nodes-tree-list.component';

interface FormSearchNodeTreeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  onSelect?: (nodeId: string) => void;
}

export function FormSearchNodeTree<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  onSelect,
}: FormSearchNodeTreeProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const handleSelect = (value: string) => {
    field.onChange(value);
    onSelect?.(value);
    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <NodesTreeList
        selectedId={field.value}
        onSelection={handleSelect}
        error={fieldState.invalid}
        showOnlyFolders
        hideDropdown
        disableLinks
      />
    </ValidationError>
  );
}
