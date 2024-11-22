import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const _ProjectTreeItemContainer = styled('div')({
  margin: '0.5em 0',
});

export const _ProjectTreeNodeLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: 18,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const _ToggleButtonContainer = styled('div')({
  width: 45,
});

export const _IconContainer = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));
