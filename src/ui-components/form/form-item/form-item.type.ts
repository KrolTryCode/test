import { ReactNode } from 'react';

import { CommonFormProps } from '../form.type';

export interface InternalFormControlProps {
  className?: string;
  children: ReactNode;
}

export interface FormControlProps
  extends InternalFormControlProps,
    Pick<CommonFormProps, 'labelPosition' | 'labelWidth'> {
  isDisabled?: boolean;
  isHidden?: boolean;
}

export interface FormItemProps extends FormControlProps, Omit<CommonFormProps, 'legendPosition'> {
  label?: ReactNode;
  children: ReactNode;
}

export const direction = {
  top: 'column' as const,
  right: 'row-reverse' as const,
  left: 'row' as const,
};
