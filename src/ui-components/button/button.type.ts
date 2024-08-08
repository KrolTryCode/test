import { SxProps, Theme } from '@mui/material';
import {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
} from 'react';
import { LinkProps } from 'react-router-dom';

import { Extract, Color, Size, Variant } from '../_type';

export interface DefaultButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  sx?: SxProps<Theme>;
  variant?: Extract<Variant, 'outlined' | 'contained'> | 'text';
  color?: Extract<Color, 'primary' | 'secondary' | 'error' | 'warning' | 'success'>;
  size?: Extract<Size, 'small' | 'medium' | 'large'>;
  icon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

interface LinkButtonProps extends DefaultButtonProps {
  component?: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement> & LinkProps>;
  to: LinkProps['to'];
}

export type ButtonProps = LinkButtonProps | DefaultButtonProps;
