import { Components, Theme } from '@mui/material/styles';

export const MuiDateTimePicker: Components<Omit<Theme, 'components'>>['MuiDateTimePicker'] = {
  defaultProps: {
    slotProps: {
      inputAdornment: {
        sx: {
          button: {
            marginLeft: '-0.5em',
            paddingRight: '0.7em',
          },
        },
      },
    },
  },
};

export const MuiDatePicker: Components<Omit<Theme, 'components'>>['MuiDatePicker'] = {
  defaultProps: {
    slotProps: {
      inputAdornment: {
        sx: {
          button: {
            marginLeft: '-0.5em',
            paddingRight: '0.7em',
          },
        },
      },
    },
  },
};

export const MuiTimePicker: Components<Omit<Theme, 'components'>>['MuiTimePicker'] = {
  defaultProps: {
    slotProps: {
      inputAdornment: {
        sx: {
          button: {
            marginLeft: '-0.5em',
            paddingRight: '0.7em',
          },
        },
      },
    },
  },
};

export const MuiPickersYear: Components<Omit<Theme, 'components'>>['MuiPickersYear'] = {
  styleOverrides: {
    root: {
      button: {
        fontSize: '1em !important',
        fontWeight: 'normal !important',
      },
    },
  },
};
