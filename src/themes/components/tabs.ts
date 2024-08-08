import { Components, Theme } from '@mui/material/styles';

export const MuiTabs: Components<Omit<Theme, 'components'>>['MuiTabs'] = {
  styleOverrides: {
    root: {
      minHeight: 'auto',
    },
    flexContainer: {
      height: '100%',
      alignItems: 'center',
      gap: '4px',
    },
    scrollButtons: {
      '&.Mui-disabled': {
        opacity: 0.3,
      },
    },
    scroller: {
      scrollbarWidth: 'thin',
    },
  },
};

export const MuiTab: Components<Omit<Theme, 'components'>>['MuiTab'] = {
  defaultProps: { disableRipple: true, tabIndex: 0 },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: '12px 6px',
      textTransform: 'none',
      minHeight: '100%',
      minWidth: 'auto',
      '&:hover, &:focus-visible, &.Mui-selected.Mui-disabled': {
        color: theme.palette.primary.main,
      },
      // stylelint-disable selector-not-notation
      '&:not(.Mui-selected):not(.Mui-disabled):not(:hover):not(:focus-visible)': {
        color: theme.palette.text.primary,
      },
      '&:not(.MuiTab-wrapped)': {
        maxWidth: 'unset',
      },
    }),
  },
};

export const MuiTabPanel: Components<Omit<Theme, 'components'>>['MuiTabPanel'] = {
  styleOverrides: {
    root: {
      ['&:not([hidden])']: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        padding: '0',
      },
    },
  },
};
