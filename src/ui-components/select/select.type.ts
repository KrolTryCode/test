import { FocusEventHandler } from 'react';

import { Extract, Variant, Size } from '../_type';

export type AutocompleteValue<Value, Multiple> = Multiple extends true ? Value[] : Value | null;
export type FormValue<Multiple> = Multiple extends true ? string[] : string;

export interface SelectInputProps {
  label?: string;
  variant?: Extract<Variant, 'outlined' | 'filled'>;
  placeholder?: string;
  error?: boolean;
}

export interface SelectProps<
  Value extends Record<string, string>,
  Multiple extends boolean | undefined,
> extends SelectInputProps {
  items: readonly Value[];
  value?: FormValue<Multiple>;
  valueExpr?: keyof Value;
  displayExpr?: keyof Value;
  onChange?: (value: FormValue<Multiple>) => void;
  onBlur?: () => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  isMultiple?: Multiple;
  isDisabled?: boolean;
  isReadonly?: boolean;
  fullWidth?: boolean;
  disableClearable?: boolean;
  size?: Extract<Size, 'medium'>;
}
export interface InternalSelectProps<Value extends Record<string, string>, Multiple extends boolean>
  extends Omit<
    SelectProps<Value, Multiple>,
    'isMultiple' | 'isDisabled' | 'isReadonly' | 'fullWidth' | 'size' | keyof SelectInputProps
  > {
  getOptionKey: (option: Value) => string | number;
  getOptionLabel: (option: Value) => string;
  inputProps: SelectInputProps;
  disabled: boolean;
  readOnly: boolean;
}
