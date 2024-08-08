import { ChangeEvent, FocusEvent } from 'react';

import { Extract, Variant } from '../_type';

export interface InputNumericProps {
  placeholder?: string;
  isDisabled?: boolean;
  variant?: Extract<Variant, 'outlined' | 'filled'>;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  trimWithoutRounding?: boolean;
  isReadonly?: boolean;
  invalid?: boolean;
  fullWidth?: boolean;
}
