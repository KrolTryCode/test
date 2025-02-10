import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import {
  UploadFile,
  UploadFileProps,
  UploadValue,
} from '~/components/inputs/upload-file/upload-file.component';

import { ValidationError } from '../_validation-error/validation-error.component';

interface FormUploadFileProps<
  Multiple extends boolean | undefined = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<UploadFileProps<Multiple>, 'onSelect'> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  isDisabled?: boolean;
  handleUpload: (file: UploadValue<Multiple>) => Promise<string | string[]>;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}

export function FormUploadFile<
  Multiple extends boolean | undefined = false,
  TFieldValues extends FieldValues = FieldValues,
>({
  controllerProps,
  handleUpload,
  onSuccess,
  onError,
  isUploading,
  isDisabled,
  isMultiple,
  ...props
}: FormUploadFileProps<Multiple, TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const handleSelect = async (file: UploadValue<Multiple>) => {
    try {
      const fileId = await handleUpload(file);
      field.onChange(fileId);
      onSuccess?.();
    } catch (e) {
      onError?.(e);
    }
    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <UploadFile
        {...props}
        isMultiple={isMultiple}
        isUploading={isUploading}
        isDisabled={isDisabled}
        onSelect={handleSelect}
      />
    </ValidationError>
  );
}
