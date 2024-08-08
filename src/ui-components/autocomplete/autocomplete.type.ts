import { Extract, Variant, Size } from '../_type';

export interface AutocompleteProps<T extends Record<string, string>> {
  items: T[];
  value?: T;
  onChange?: (value: T) => void;
  valueExpr?: keyof T;
  displayExpr?: keyof T;
  isReadonly?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  onBlur?: () => void;
  size?: Extract<Size, 'medium'>;

  // textfield props
  label?: string;
  variant?: Extract<Variant, 'outlined' | 'filled'>;
  placeholder?: string;
  invalid?: boolean;
}
