import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

import { Extract, Color, Size } from '../_type';

export interface AvatarProps extends MuiAvatarProps {
  size?: Size | number;
  withIcon?: boolean;
  color?: Extract<Color, 'primary' | 'secondary'>;
}
