import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

import { AvatarProps } from './avatar.type';

export const StyledAvatar = styled(Avatar)<AvatarProps>(({ size, color, theme }) => ({
  fontSize: '20px',
  width: '2em',
  height: '2em',

  ...(color === 'primary' && {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  }),
  ...(color === 'secondary' && {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
  }),

  ...(size === 'small' && {
    fontSize: '17px',
  }),
  ...(size === 'large' && {
    fontSize: '75px',
  }),
  ...(typeof size === 'number' && {
    fontSize: `${size}px`,
  }),

  '& .MuiSvgIcon-root': {
    fontSize: '1.5em',
  },
}));
