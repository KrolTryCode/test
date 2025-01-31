import { UploadImage, UploadImageProps } from '@pspod/ui-components';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { useGetImage } from '~/components/upload-file/use-get-image.hook';
import { fileTypeExtensions, validateSelectedFiles } from '~/utils/files/validate-files';

import { ValidationError } from '../_validation-error/validation-error.component';

export interface FormUploadImageProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<UploadImageProps, 'onSelect' | 'onDelete' | 'accept' | 'src'> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  isDisabled?: boolean;
  handleUpload: (file: File) => Promise<string | undefined> | Promise<Error>;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
  accept?: string;
}

export function FormUploadImage<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  handleUpload,
  onSuccess,
  onError,
  isLoading,
  isDisabled,
  accept = fileTypeExtensions['image'].join(', '),
  ...avatarProps
}: FormUploadImageProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { field, fieldState } = useController(controllerProps);

  const { image, isImageLoading } = useGetImage(field.value);

  const onSelectImage = async (file: File) => {
    const isValid = !!validateSelectedFiles([file], 'image').length;
    if (isValid) {
      try {
        const fileId = await handleUpload(file);
        field.onChange(fileId);
        onSuccess?.();
      } catch (e) {
        onError?.(e);
      }
    }
    field.onBlur();
  };

  return (
    <ValidationError {...fieldState}>
      <UploadImage
        {...avatarProps}
        accept={accept}
        src={image?.src}
        isLoading={isImageLoading || isLoading}
        isDisabled={isDisabled}
        onSelect={onSelectImage}
      />
    </ValidationError>
  );
}
