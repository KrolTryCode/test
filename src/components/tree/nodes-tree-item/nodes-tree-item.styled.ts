import { styled } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const _ProjectTreeItemContainer = styled('div')(({ theme }) => ({
  marginBlock: theme.spacing(1),
  wordBreak: 'break-word',
  width: '100%',
}));

export const _ToggleButtonContainer = styled('div')({
  width: 32,
});

export const _TreeNodeLink = styled(Link)(({ theme, disabled }) => ({
  ...theme.typography.h4,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  hyphens: 'auto',
  cursor: disabled ? 'default' : 'pointer',
  '&:hover': {
    textDecoration: disabled ? 'none' : 'underline',
    pointerEvents: disabled ? 'none' : 'auto',
  },
}));
