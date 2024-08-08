import { MenuProps } from '@mui/material/Menu';
import { ReactNode } from 'react';

import { ButtonProps } from '../button/button.type';

export interface DropdownMenuProps
  extends Omit<MenuProps, 'anchorEl' | 'open' | 'onClose' | 'onClick'> {
  buttonContent?: ReactNode;
  icon?: ReactNode;
  buttonSize?: ButtonProps['size'];
  buttonColor?: ButtonProps['color'] | 'text.secondary';
  buttonVariant?: ButtonProps['variant'];
  isLoading?: boolean;
  showArrow?: boolean;
  openInteraction?: 'hover' | 'click';
  closeOnClick?: boolean;
}
