import { Components, Theme } from '@mui/material/styles';

export const MuiMenu: Components<Omit<Theme, 'components'>>['MuiMenu'] = {
  defaultProps: {
    elevation: 5,
    transformOrigin: { horizontal: 'right', vertical: 'top' },
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
  },
  styleOverrides: {
    root: { marginTop: '4px' },
    list: { borderRadius: 'inherit' },
  },
};

export const MuiMenuItem: Components<Omit<Theme, 'components'>>['MuiMenuItem'] = {
  defaultProps: { disableRipple: true },
  styleOverrides: {
    root: ({ theme }) => ({
      '&[color="error"]': {
        color: theme.palette.error.main,
        '&:hover': {
          backgroundColor: `${theme.palette.error.main}08`,
        },
      },
    }),
  },
};
