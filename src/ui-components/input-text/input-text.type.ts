import { InputHTMLAttributes, ReactNode, Ref } from 'react';

import { Extract, Variant, Size } from '../_type';

export type InputTextType = 'text' | 'password' | 'email';

export interface InputTextProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'autoFocus'> {
  type?: InputTextType;
  placeholder?: string;
  isDisabled?: boolean;
  isMultiline?: boolean;
  isMasked?: boolean;
  variant?: Extract<Variant, 'outlined' | 'filled'>;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLTextAreaElement | HTMLInputElement>;
  size?: Extract<Size, 'medium'>;
  isReadonly?: InputHTMLAttributes<HTMLInputElement>['readOnly'];
  startIcon?: ReactNode;
}
