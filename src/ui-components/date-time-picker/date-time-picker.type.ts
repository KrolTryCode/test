import { RefCallback } from 'react';

import { Extract, Variant } from '../_type';

export type PickerType = 'date' | 'datetime' | 'time';

export interface DateTimePickerProps {
  value: Date | null;
  onChange?: (value: Date | null) => void;
  format?: string;
  type?: PickerType;
  isDisabled?: boolean;
  minDate?: Date;
  onBlur?: () => void;
  variant?: Extract<Variant, 'filled' | 'outlined'>;
  className?: string;
  inputRef?: RefCallback<unknown>;
  invalid?: boolean;
  showClearButton?: boolean;
}
