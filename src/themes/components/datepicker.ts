import { Components, Theme } from '@mui/material/styles';

export const MuiDateTimePicker: Components<Omit<Theme, 'components'>>['MuiDateTimePicker'] = {
  defaultProps: {
    slotProps: {
      openPickerButton: { size: 'small' },
      inputAdornment: {
        sx: theme => ({
          button: {
            marginRight: 0,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: `${theme.palette.text.primary}20`,
            },
          },
        }),
      },
    },
  },
};

export const MuiDatePicker: Components<Omit<Theme, 'components'>>['MuiDatePicker'] = {
  defaultProps: {
    slotProps: {
      openPickerButton: { size: 'small' },
      layout: { sx: { '.MuiDateCalendar-root': { height: 'fit-content' } } },
      inputAdornment: {
        sx: theme => ({
          button: {
            marginRight: 0,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: `${theme.palette.text.primary}20`,
            },
          },
        }),
      },
    },
  },
};

export const MuiTimePicker: Components<Omit<Theme, 'components'>>['MuiTimePicker'] = {
  defaultProps: {
    slotProps: {
      openPickerButton: { size: 'small' },
      inputAdornment: {
        sx: theme => ({
          button: {
            marginRight: 0,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: `${theme.palette.text.primary}20`,
            },
          },
        }),
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
