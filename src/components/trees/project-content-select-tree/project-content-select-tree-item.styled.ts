import { Box, styled } from '@mui/material';

export const _ProjectContentSelectTreeContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  borderWidth: '1px',
  borderStyle: 'solid',
  padding: '1em 0.5em',
}));

export const _ProjectContentSelectTreeItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: theme.shape.borderRadius,

  '&:has(a.active)': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export const _ProjectContentSelectTreeNodeLink = styled('a')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  hyphens: 'auto',
  flex: 1,

  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const _ToggleButtonContainer = styled('div')({
  width: 30,
  flexShrink: 0,
});

export const _IconContainer = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  width: 30,
  height: 30,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const _ProjectContentElementLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingInline: '0.6em',
  borderRadius: '0.2em',
  flex: 1,
  margin: 0,
  cursor: 'pointer',

  '&.active': {
    backgroundColor: theme.palette.secondary.light,
  },

  '&.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));
