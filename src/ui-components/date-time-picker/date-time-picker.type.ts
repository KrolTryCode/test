import { TimeView, DateView, DateOrTimeView } from '@mui/x-date-pickers-pro';
import { RefCallback } from 'react';

import { Extract, Variant } from '../_type';

export type PickerType = 'date' | 'datetime' | 'time';

export type DateTimePickerProps = DateTimePickerCommonProps &
  (DateTimeProps | DateProps | TimeProps);

interface DateTimePickerCommonProps {
  value: Date | null;
  onChange?: (value: Date | null) => void;
  format?: string;
  type?: PickerType;
  isDisabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onBlur?: () => void;
  variant?: Extract<Variant, 'filled' | 'outlined'>;
  className?: string;
  inputRef?: RefCallback<unknown>;
  invalid?: boolean;
  showClearButton?: boolean;
  fullWidth?: boolean;
}

interface DateTimeProps {
  type?: 'datetime';
  views?: DateOrTimeView[];
}

interface DateProps {
  type: 'date';
  views?: DateView[];
}

interface TimeProps {
  type: 'time';
  views?: TimeView[];
}
