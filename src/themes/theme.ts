import { ThemeOptions } from '@mui/material';

import { MuiAutocomplete } from './components/autocomplete';
import { MuiButton, MuiIconButton, MuiButtonGroup } from './components/button';
import { MuiDataGrid, MuiTablePagination } from './components/data-grid';
import {
  MuiDateTimePicker,
  MuiDatePicker,
  MuiTimePicker,
  MuiPickersYear,
} from './components/datepicker';
import { MuiFormControl, MuiFormLabel, MuiFormControlLabel } from './components/form';
import { MuiTextField, MuiFilledInput, MuiOutlinedInput, MuiInputLabel } from './components/input';
import { MuiMenu, MuiMenuItem } from './components/menu';
import { MuiTabs, MuiTab, MuiTabPanel } from './components/tabs';
import { palette } from './palette';
import { typography } from './typography';

export const themeOptions: ThemeOptions = {
  palette,
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 680,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTypography: { defaultProps: { gutterBottom: true } },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          paddingBlock: 0,
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          paddingBlock: '8px',
          fontSize: '12px',
          fontWeight: 'normal',
          borderRadius: '5px',
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 5 },
      styleOverrides: {
        root: { overflow: 'hidden' },
      },
    },
    MuiList: { styleOverrides: { root: { paddingTop: 0, paddingBottom: 0 } } },
    MuiDialogTitle: {
      defaultProps: { gutterBottom: false },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '0.5em 1em',
          fontSize: '20px !important',
          position: 'relative',
          button: {
            position: 'absolute',
            right: '0.5em',
            top: '50%',
            translate: '0 -50%',
            '&:hover': {
              color: theme.palette.error.main,
            },
          },
        }),
      },
    },
    MuiCircularProgress: { defaultProps: { disableShrink: true } },
    MuiTabs,
    MuiTab,
    MuiTabPanel,
    MuiMenu,
    MuiMenuItem,
    MuiFormControl,
    MuiFormControlLabel,
    MuiFormLabel,
    MuiAutocomplete,
    MuiButtonGroup,
    MuiButton,
    MuiIconButton,
    MuiTextField,
    MuiInputLabel,
    MuiFilledInput,
    MuiOutlinedInput,
    MuiTablePagination,
    MuiDataGrid,
    MuiDateTimePicker,
    MuiDatePicker,
    MuiTimePicker,
    MuiPickersYear,
  },
};
