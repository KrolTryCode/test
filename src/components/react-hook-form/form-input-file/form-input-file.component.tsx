import { AttachFile } from '@mui/icons-material';
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from 'react';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ValidationError } from '~/components/react-hook-form/_validation-error/validation-error.component';
import { Button } from '~/ui-components/button/button.component';

interface FormInputFileProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  accept?: string;
}

export function FormInputFile<TFieldValues extends FieldValues = FieldValues>({
  controllerProps,
  inputProps,
  accept,
}: FormInputFileProps<TFieldValues, FieldPath<TFieldValues>>) {
  const { t } = useTranslation();
  const { field, fieldState } = useController(controllerProps);
  const [filename, setFilename] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFilename(file?.name ?? null);
    field.onChange(file);
    field.onBlur();
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <ValidationError {...fieldState}>
      <input
        {...inputProps}
        type={'file'}
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={inputRef}
      />
      <Button
        icon={<AttachFile />}
        color={fieldState.invalid ? 'error' : 'secondary'}
        onClick={handleButtonClick}
      >
        {filename ?? t('BUTTON.SELECT', { type: t('COMMON.FILE').toLowerCase() })}
      </Button>
    </ValidationError>
  );
}
