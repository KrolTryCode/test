import { styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const _ProjectTreeItemContainer = styled('div')(({ theme }) => ({
  marginBlock: theme.spacing(1),
  marginRight: theme.spacing(2),
  wordBreak: 'break-word',
}));

export const _ProjectTreeNodeLink = styled(Link)(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  hyphens: 'auto',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const _ToggleButtonContainer = styled('div')({
  width: 32,
  flexShrink: 0,
});

export const _IconContainer = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  width: 50,
  height: 50,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const _Description = styled(Typography)({
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  whiteSpace: 'break-spaces',
});
