import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import { Icon, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, FC, FocusEvent, InputHTMLAttributes, useMemo, useState } from 'react';

import { InputTextProps, InputTextType } from './input-text.type';

export const InputText: FC<InputTextProps> = ({
  type = 'text',
  variant = 'outlined',
  size = 'medium',
  isDisabled,
  isMultiline,
  isReadonly,
  isMasked,
  invalid,
  fullWidth,
  placeholder,
  value = '',
  autoComplete,
  autoFocus = false,
  inputRef,
  onChange,
  onBlur,
  startIcon,
}) => {
  const [mode, setMode] = useState<InputTextType>(type);
  const showPasswordClickHandler = () => setMode(prev => (prev === 'text' ? 'password' : 'text'));

  const InputProps = useMemo<TextFieldProps['InputProps']>(() => {
    const VisibilityIcon = mode === 'password' ? Visibility : VisibilityOff;
    return {
      startAdornment: startIcon && (
        <InputAdornment position={'start'}>
          <Icon>{startIcon}</Icon>
        </InputAdornment>
      ),
      endAdornment: type === 'password' && (
        <InputAdornment position={'end'} onClick={showPasswordClickHandler}>
          <IconButton>
            <VisibilityIcon color={'primary'} fontSize={'small'} />
          </IconButton>
        </InputAdornment>
      ),
    };
  }, [mode, startIcon, type]);

  const inputProps = useMemo<InputHTMLAttributes<HTMLInputElement>>(
    () => ({
      autoComplete: getAutoComplete(type, autoComplete),
      readOnly: !!isReadonly,
      'aria-readonly': !!isReadonly,
    }),
    [autoComplete, isReadonly, type],
  );

  const valueChangedHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange?.(event.target.value ?? '');
  };

  const blurHandler = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange?.(event.target.value.trim() ?? '');
    onBlur?.();
  };

  return (
    <TextField
      inputRef={inputRef}
      // masked input is controlled by IMaskMixin
      value={!isMasked ? value : undefined}
      onChange={!isMasked ? valueChangedHandler : undefined}
      onBlur={blurHandler}
      variant={variant}
      placeholder={placeholder}
      InputProps={InputProps}
      inputProps={inputProps}
      type={mode}
      multiline={isMultiline}
      error={invalid}
      disabled={isDisabled}
      fullWidth={fullWidth}
      size={size}
      autoFocus={autoFocus}
    />
  );
};

function getAutoComplete(
  type: InputTextProps['type'],
  autoComplete: InputTextProps['autoComplete'],
) {
  if (type === 'password' && !autoComplete) {
    return 'current-password';
  } else if (type === 'email') {
    return type;
  }

  return autoComplete ?? 'off';
}
