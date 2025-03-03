import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';
import {
  ProjectContentSelectTree,
  ProjectContentSelectTreeProps,
} from '~/components/trees/project-content-select-tree/project-content-select-tree.component';

type FormSelectContentNodeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  controllerProps: UseControllerProps<TFieldValues, TName>;
} & ProjectContentSelectTreeProps;

export function FormSelectContentNode<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ controllerProps, ...componentProps }: FormSelectContentNodeProps<TFieldValues, TName>) {
  const { field, fieldState } = useController(controllerProps);

  const handleSelect = (value: string | string[]) => {
    field.onChange(value);
    //@ts-expect-error dynamic value type
    componentProps.onChange?.(value);
    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <ProjectContentSelectTree {...componentProps} value={field.value} onChange={handleSelect} />
    </ValidationError>
  );
}
