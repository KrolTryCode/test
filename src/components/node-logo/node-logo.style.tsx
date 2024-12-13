import { Stack, styled } from '@mui/material';
import { Avatar } from '@pspod/ui-components';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    width: '80%',
    height: '80%',
  },

  '&.MuiAvatar-root': {
    border: '1px solid',
    borderColor: theme.palette.secondary.light,
    backgroundColor: `${theme.palette.secondary.main}15`,
    borderRadius: theme.shape['borderRadius'],
  },

  '& .MuiCircularProgress-root': {
    width: '1em !important',
    height: '1em !important',
  },
}));

export const StyledAvatarContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  height: 'fit-content',
  flexShrink: '0',
  borderRadius: theme.shape['borderRadius'],
}));

export const StyledBackdrop = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  borderRadius: theme.shape['borderRadius'],
  opacity: '0',
  color: theme.palette.common.white,
  backgroundColor: `${theme.palette.primary.main}50`,
  backdropFilter: 'brightness(0.7)',
  transition: theme.transitions.create('opacity'),
  '&:hover, &:focus-visible': { opacity: '1' },
  button: {
    transition: theme.transitions.create('color'),
  },
}));
