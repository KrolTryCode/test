import { Components, Theme } from '@mui/material/styles';

export const MuiFormControl: Components<Omit<Theme, 'components'>>['MuiFormControl'] = {
  defaultProps: { margin: 'none' },
  styleOverrides: {
    root: {
      '&[hidden]': {
        display: 'none',
      },
      '&.MuiDataGrid-filterFormColumnInput': {
        minWidth: '450px',
      },
    },
  },
};

export const MuiFormLabel: Components<Omit<Theme, 'components'>>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginBottom: '4px',
      color: theme.palette.text.primary,
      '&.Mui-focused': {
        color: theme.palette.text.primary,
      },
    }),
    asterisk: ({ theme }) => ({
      color: theme.palette.error.main,
    }),
  },
};

export const MuiFormControlLabel: Components<Omit<Theme, 'components'>>['MuiFormControlLabel'] = {
  defaultProps: { disableTypography: true },
};
