import { FileCardProps } from '@pspod/ui-components';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import {
  UploadFile,
  UploadFileProps,
  UploadValue,
} from '~/components/inputs/upload-file/upload-file.component';
import { calcFileSize } from '~/utils/files';

import { ValidationError } from '../_validation-error/validation-error.component';

interface FormUploadFileProps<
  Multiple extends boolean | undefined = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<UploadFileProps<Multiple>, 'onSelect' | 'files'> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export function FormUploadFile<
  Multiple extends boolean | undefined = false,
  TFieldValues extends FieldValues = FieldValues,
>({
  controllerProps,
  isUploading,
  isDisabled,
  isMultiple,
  ...props
}: FormUploadFileProps<Multiple, TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const handleSelect = (files: UploadValue<Multiple>) => {
    const fileArray: File[] = Array.isArray(files) ? files : [files];
    if (isMultiple) {
      const fieldFiles = (field.value ?? []) as FileCardProps[];
      field.onChange(filesToFiles([...fieldFiles, ...fileArray]));
    } else {
      field.onChange(filesToFiles(fileArray)[0]);
    }

    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <UploadFile
        {...props}
        files={field.value && !Array.isArray(field.value) ? [field.value] : field.value}
        isMultiple={isMultiple}
        isInvalid={!!fieldState.error}
        isUploading={isUploading}
        isDisabled={isDisabled}
        onSelect={handleSelect}
      />
    </ValidationError>
  );
}

function filesToFiles(files: (File | FileCardProps)[] = []): FileCardProps[] {
  return files.map<FileCardProps>(file => {
    if (file instanceof File) {
      const id = file.lastModified.toString();
      return {
        id,
        name: file.name,
        description: calcFileSize(file.size),
        file: file,
      };
    }

    return file;
  });
}
