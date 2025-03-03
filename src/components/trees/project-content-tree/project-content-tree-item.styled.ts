import { styled } from '@mui/material';

export const _ProjectContentTreeItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: theme.shape.borderRadius,

  '&:has(a.active)': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export const _ProjectContentTreeNodeLink = styled('a')(({ theme }) => ({
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
