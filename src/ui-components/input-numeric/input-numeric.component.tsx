import { TextField } from '@mui/material';
import { ChangeEventHandler, FC, useMemo } from 'react';

import { InputNumericProps } from './input-numeric.type';

// согласно примеру из документации value задается строкой
// https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
export const InputNumeric: FC<InputNumericProps> = ({
  variant = 'outlined',
  isDisabled,
  isReadonly,
  invalid,
  onChange,
  onBlur,
  value = '',
  trimWithoutRounding,
  fullWidth,
  placeholder,
  max,
  min,
  step,
  inputRef,
}) => {
  const valueChangedHandler: ChangeEventHandler<HTMLInputElement> = event => {
    let value = event.target.valueAsNumber;
    const isNumber = !Number.isNaN(value);
    if (isNumber) {
      value = trimWithoutRounding ? Math.trunc(value) : +value.toFixed(2);
    }
    onChange?.(isNumber ? value.toString() : '', event);
  };

  const inputProps = useMemo(
    () => ({ readOnly: isReadonly, max, min, step }),
    [isReadonly, max, min, step],
  );

  return (
    <TextField
      inputRef={inputRef}
      type={'number'}
      value={value}
      onChange={valueChangedHandler}
      onBlur={onBlur}
      inputProps={inputProps}
      disabled={isDisabled}
      error={invalid}
      variant={variant}
      placeholder={placeholder}
      fullWidth={fullWidth}
      onFocus={e => e.target.addEventListener('wheel', e => e.stopPropagation())}
    />
  );
};
