import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { HTMLRichEditor } from '~/components/html-rich-editor/html-rich-editor.component';
import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';

interface FormInputRichTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormInputRichTextEditor<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
}: FormInputRichTextProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  return (
    <ValidationError placement={'top'} {...fieldState}>
      <HTMLRichEditor
        value={field.value}
        isFieldStateError={fieldState.invalid}
        onBlur={field.onBlur}
        onChange={field.onChange}
      />
    </ValidationError>
  );
}
