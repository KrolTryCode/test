import { AttachFile } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Button } from '@pspod/ui-components';
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from 'react';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetImageQuery } from '~/api/queries/files/get-image.query';
import { ImagePreview } from '~/components/react-hook-form/form-input-file/image-preview.component';

import { ValidationError } from '../_validation-error/validation-error.component';

interface FormInputFileProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  accept?: string;
  showPreview?: boolean;
  onChangeFile?: (file: File | undefined, field: string) => void;
  isLoading?: boolean;
  initialFilename?: string | null;
}

export function FormInputFile<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  inputProps,
  accept,
  showPreview = false,
  onChangeFile,
  isLoading,
  initialFilename = null,
}: FormInputFileProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { t } = useTranslation();
  const { field, fieldState } = useController(controllerProps);
  const [filename, setFilename] = useState<string | null>(initialFilename);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: image, isFetching: isImageLoading } = useGetImageQuery(field.value, {
    enabled: showPreview,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFilename(file?.name ?? null);
    field.onChange(file);
    onChangeFile?.(file, field.name);
    field.onBlur();
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const isContentLoading = isImageLoading || isLoading;

  return (
    <ValidationError {...fieldState}>
      {showPreview && <ImagePreview preview={image} />}
      <input
        {...inputProps}
        type={'file'}
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={inputRef}
      />
      <Button
        icon={isContentLoading ? <CircularProgress size={16} /> : <AttachFile />}
        color={fieldState.invalid ? 'error' : 'secondary'}
        disabled={isContentLoading}
        onClick={handleButtonClick}
      >
        {filename ?? t('ACTION.SELECT', { type: t('COMMON.FILE').toLowerCase() })}
      </Button>
    </ValidationError>
  );
}
