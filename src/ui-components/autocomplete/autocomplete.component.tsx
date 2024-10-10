import CancelIcon from '@mui/icons-material/Cancel';
import { TextField } from '@mui/material';
import MuiAutocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { FormEventHandler, SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { AutocompleteProps } from './autocomplete.type';

export function Autocomplete<T extends Record<string, any>>({
  items,
  value,
  onBlur,
  onChange,
  label,
  placeholder,
  valueExpr = 'id',
  displayExpr = 'name',
  size = 'medium',
  variant = 'outlined',
  invalid,
  isReadonly,
  isDisabled,
  fullWidth,
}: AutocompleteProps<T>) {
  const [inputedVal, setInputedVal] = useState<T>({
    [valueExpr]: value?.[valueExpr] ?? '',
    [displayExpr]: value?.[displayExpr] ?? '',
  } as T);

  useEffect(() => {
    if (value) {
      setInputedVal({
        [valueExpr]: value[valueExpr] ?? '',
        [displayExpr]: value[displayExpr] ?? '',
      } as T);
    }
  }, [displayExpr, value, valueExpr]);

  const onSelect = (_event: SyntheticEvent<Element, Event>, value: T | null | string) => {
    if (typeof value !== 'string') {
      setInputedVal(value ?? ({ [valueExpr]: '', [displayExpr]: value ?? '' } as T));
    }
  };

  const onInput: FormEventHandler<HTMLInputElement> = event => {
    const value = (event.target as HTMLInputElement).value || '';
    setInputedVal({ [valueExpr]: '', [displayExpr]: value } as T);
  };

  const onFocusOut = () => {
    onChange?.(inputedVal);
    onBlur?.();
  };

  const getOptionKey = useCallback(
    (item: string | T) => (typeof item === 'string' ? item : String(item[valueExpr])),
    [valueExpr],
  );

  const getOptionLabel = useCallback(
    (item: string | T) => (typeof item === 'string' ? item : String(item[displayExpr])),
    [displayExpr],
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        error={invalid}
        variant={variant}
        label={label}
        placeholder={placeholder}
        {...params}
      />
    ),
    [variant, label, placeholder, invalid],
  );

  return (
    <MuiAutocomplete
      options={items}
      value={inputedVal[displayExpr]}
      renderInput={renderInput}
      getOptionKey={getOptionKey}
      getOptionLabel={getOptionLabel}
      onChange={onSelect}
      onInput={onInput}
      onBlur={onFocusOut}
      fullWidth={fullWidth}
      readOnly={isReadonly}
      disabled={isDisabled}
      placeholder={placeholder}
      clearIcon={<CancelIcon />}
      freeSolo
      forcePopupIcon={!!items.length}
      openOnFocus
      size={size}
    />
  );
}
