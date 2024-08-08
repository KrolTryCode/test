import { useCallback, useMemo } from 'react';

import { Multiselect } from './_multiselect/multiselect.component';
import { Singleselect } from './_singleselect/singleselect.component';
import { SelectInputProps, SelectProps } from './select.type';

export function Select<
  Value extends Record<string, any>,
  Multiple extends boolean | undefined = false,
>({
  value,
  label,
  placeholder,
  valueExpr = 'id',
  displayExpr = 'name',
  variant = 'outlined',
  isMultiple,
  error = false,
  isDisabled = false,
  isReadonly = false,
  ...selectProps
}: SelectProps<Value, Multiple>) {
  const getOptionKey = useCallback(
    (item: Value) => (item && valueExpr in item ? (item[valueExpr] as string) : ''),
    [valueExpr],
  );

  const getOptionLabel = useCallback(
    (item: Value) => (item && displayExpr in item ? (item[displayExpr] as string) : ''),
    [displayExpr],
  );

  const inputProps = useMemo<SelectInputProps>(
    () => ({
      error,
      variant: variant,
      label: label,
      placeholder: placeholder,
    }),
    [error, label, placeholder, variant],
  );

  const SelectComponent = isMultiple ? Multiselect : Singleselect;

  return (
    <SelectComponent
      // @ts-expect-error type
      value={value}
      inputProps={inputProps}
      valueExpr={valueExpr}
      displayExpr={displayExpr}
      getOptionKey={getOptionKey}
      getOptionLabel={getOptionLabel}
      disabled={isDisabled}
      readOnly={isReadonly}
      {...selectProps}
    />
  );
}
