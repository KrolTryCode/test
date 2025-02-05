import { styled, Typography } from '@mui/material';

export const _GroupSelectContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.common.black}30`,
  padding: '1em 0.5em',
}));

export const _GroupSelectElementContainer = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
}));

export const _GroupSelectElementTogglerContainer = styled('div')(({ theme }) => ({
  color: theme.palette.primary.dark,
  flex: '0 0 2em',
  height: '2em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '> *': {
    cursor: 'pointer',
    transition: 'transform .2s ease-in-out',
  },
}));

export const _GroupSelectElementLabel = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  paddingInline: '0.6em',
  borderRadius: '0.2em',
  flex: 1,
  margin: 0,
  cursor: 'pointer',
});

export const _ChildrenContainer = styled('div')({
  marginLeft: '1em',
});
