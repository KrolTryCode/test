import { Stack, styled } from '@mui/material';

export const StyledAvatarContainer = styled(Stack)({
  position: 'relative',
  height: 'fit-content',
  flexShrink: '0',
  borderRadius: '50%',
});

export const StyledBackdrop = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  borderRadius: '50%',
  opacity: '0',
  color: theme.palette.common.white,
  backgroundColor: `${theme.palette.primary.main}50`,
  backdropFilter: 'brightness(0.7)',
  transition: theme.transitions.create('opacity'),
  '&:hover, &:focus-visible': { opacity: '1' },
  button: {
    transition: theme.transitions.create('color'),
    // color: theme.palette.common.white,
  },
}));
