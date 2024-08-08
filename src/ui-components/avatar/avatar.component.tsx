import ProfileIcon from '@mui/icons-material/PersonOutlineOutlined';
import { FC } from 'react';

import { StyledAvatar } from './avatar.style';
import { AvatarProps } from './avatar.type';

export const Avatar: FC<AvatarProps> = ({
  size = 'medium',
  withIcon = false,
  color = 'primary',
  alt = 'Avatar',
  children,
  ...props
}) => {
  return (
    <StyledAvatar size={size} alt={alt} color={color} {...props}>
      {withIcon && typeof children !== 'string' && (children ?? <ProfileIcon />)}
      {!withIcon && children}
    </StyledAvatar>
  );
};
