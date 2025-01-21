import { styled } from '@mui/material';

export const StyledHeaderNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  maxWidth: '100%',
  overflowX: 'auto',
  scrollbarColor: `white ${theme.palette.primary.main}`,
  scrollbarWidth: 'thin',

  a: {
    marginTop: '12px',
    marginBottom: 0,
    fontSize: theme.typography.h5['fontSize'],
    height: '2.5em',
    lineHeight: '2.5em',
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',

    '&.active': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
