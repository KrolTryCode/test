import MuiButton from '@mui/lab/LoadingButton';
import { FC } from 'react';

import { ButtonProps } from './button.type';

const Button: FC<ButtonProps> = ({
  icon,
  size = 'medium',
  color = 'secondary',
  variant = 'outlined',
  isLoading,
  disabled,
  fullWidth,
  children,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      className={icon && !children ? 'icon-button' : ''}
      size={size}
      variant={variant}
      color={color}
      disabled={disabled}
      loading={isLoading}
      startIcon={icon}
      fullWidth={fullWidth}
    >
      {children}
    </MuiButton>
  );
};

export { Button };
