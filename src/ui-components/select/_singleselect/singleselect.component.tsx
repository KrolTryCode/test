import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SyntheticEvent, useCallback, useMemo } from 'react';

import { AutocompleteValue, InternalSelectProps } from '../select.type';

export function Singleselect<Value extends Record<string, any>>({
  items,
  value,
  onBlur,
  onChange,
  valueExpr,
  displayExpr: _,
  inputProps,
  ...props
}: InternalSelectProps<Value, false>) {
  const selectValue = useMemo(
    () => items.find(item => item[valueExpr!] === value) ?? null,
    [items, valueExpr, value],
  );

  const onSelect = (
    _event: SyntheticEvent<Element, Event>,
    value: AutocompleteValue<Value, false>,
  ) => {
    const newValue = (value as Value)?.[valueExpr!] || '';
    onChange?.(newValue);
  };

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => <TextField {...params} {...inputProps} />,
    [inputProps],
  );

  return (
    <Autocomplete
      {...props}
      options={items}
      value={selectValue}
      renderInput={renderInput}
      onChange={onSelect}
      onBlur={onBlur}
      multiple={false}
      clearIcon={<CancelIcon />}
      blurOnSelect
    />
  );
}
