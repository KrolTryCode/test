import { Stack, styled } from '@mui/material';

export const CarouselWrapper = styled(Stack)(({ theme }) => ({
  height: '300px',
  aspectRatio: '16 / 9',

  '&[hidden]': {
    display: 'none',
  },

  [theme.breakpoints.down('lg')]: {
    flex: '300px',
    width: '100%',
    maxWidth: '600px',
    alignSelf: 'center',
  },
}));

export const ButtonsWrapper = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: '2px',
  right: '2px',
  gap: theme.spacing(1 / 4),

  '& button': {
    padding: theme.spacing(1 / 2),
    backgroundColor: '#ffffff80',
    '&:hover': { backgroundColor: '#ffffff95' },
  },
}));

export const carouselStyles = { position: 'relative', height: '100%' };
