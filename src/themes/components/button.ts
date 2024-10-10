import { Components, Theme, CSSInterpolation, CSSObject } from '@mui/material/styles';

export const MuiButtonGroup: Components<Omit<Theme, 'components'>>['MuiButtonGroup'] = {
  defaultProps: { disableRipple: true },
};

export const MuiIconButton: Components<Omit<Theme, 'components'>>['MuiIconButton'] = {
  defaultProps: { disableRipple: true },
};

export const MuiButton: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: { disableRipple: true, disableElevation: true },
  styleOverrides: {
    sizeSmall: { fontSize: '12px' },
    sizeMedium: { fontSize: '14px' },
    sizeLarge: { fontSize: '16px' },
    contained: { border: '1px solid' },
    startIcon: {
      '& *:not(.MuiSvgIcon-root)': { fontSize: 'inherit' },
      '& .MuiSvgIcon-root': { fontSize: '1.5em' },
    },
    root: {
      padding: '0.4em 0.75em',
      minWidth: 'auto',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: 1.5,
      borderRadius: '5px',
      '&[hidden]': {
        visibility: 'hidden',
      },
      '&.Mui-disabled': {
        opacity: 0.5,
      },
      '& svg': {
        fill: 'currentColor',
      },
      '&.icon-button .MuiButton-startIcon': {
        margin: 0,
      },
    },

    textPrimary: ({ theme }) => getTextButtonStyles(theme.palette.primary.main),
    textSecondary: ({ theme }) => ({
      color: `${theme.palette.text.primary} !important`,
      ...getTextButtonStyles(theme.palette.text.primary),
    }),
    outlinedPrimary: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.primary.main,
        hover: '#003d77',
        focus: '#003568',
        active: '#001830',
      }),
    containedPrimary: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.primary.main,
        hover: '#003d77',
        focus: '#003568',
        active: '#001830',
      }),
    outlinedSecondary: ({ theme }) => ({
      color: theme.palette.secondary.main,
      borderColor: '#dddddd',
      '&:hover': {
        borderColor: '#dddddd',
        backgroundColor: '#f5f5f5',
      },
      '&:focus-visible': {
        borderColor: '#dddddd',
        backgroundColor: '#ebebeb',
      },
      '&:active': {
        borderColor: '#dddddd',
        backgroundColor: '#c2c2c2',
      },
    }),
    containedSecondary: ({ theme }) =>
      getContainedButtonStyles({
        main: '#353535',
        hover: '#151515',
        focus: '#131313',
        active: theme.palette.secondary.main,
      }),

    outlinedWarning: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.warning.main,
        hover: '#d66e0b',
        focus: '#c96707',
        active: '#bb5f07',
      }),
    containedWarning: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.warning.main,
        hover: '#d66e0b',
        focus: '#c96707',
        active: '#bb5f07',
      }),
    outlinedError: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.error.main,
        hover: '#be0909',
        focus: '#b00808',
        active: '#7a0606',
      }),
    containedError: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.error.main,
        hover: '#be0909',
        focus: '#b00808',
        active: '#7a0606',
      }),
    outlinedSuccess: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.success.main,
        hover: '#23904f',
        focus: '#208448',
        active: '#15572f',
      }),
    containedSuccess: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.success.main,
        hover: '#23904f',
        focus: '#208448',
        active: '#15572f',
      }),
  },
};

interface Colors {
  main: string;
  hover: string;
  focus: string;
  active: string;
}

function getContainedButtonStyles({ main, hover, focus, active }: Colors): CSSInterpolation {
  return {
    '&, &.Mui-disabled': {
      backgroundColor: main,
      borderColor: main,
      '&:not(.MuiLoadingButton-loading)': {
        color: '#fff',
      },
    },
    '& .MuiLoadingButton-loadingIndicator': {
      color: '#fff',
    },
    '&:hover': {
      color: '#fff',
      backgroundColor: hover,
      borderColor: hover,
    },
    '&:focus-visible': {
      color: '#fff',
      backgroundColor: focus,
      borderColor: focus,
    },
    '&:active': {
      color: '#fff',
      backgroundColor: active,
      borderColor: active,
    },
  };
}

function getOutlinedButtonStyles({ main, hover, focus, active }: Colors): CSSInterpolation {
  return {
    '&, &.Mui-disabled, & .MuiLoadingButton-loadingIndicator': {
      color: main,
      borderColor: main,
    },
    '&:hover': {
      color: '#fff',
      backgroundColor: hover,
      borderColor: hover,
    },
    '&:focus-visible': {
      color: '#fff',
      backgroundColor: focus,
      borderColor: focus,
    },
    '&:active': {
      color: '#fff',
      backgroundColor: active,
      borderColor: active,
    },
  };
}

function getTextButtonStyles(color: string): CSSObject {
  return {
    '&:hover': {
      backgroundColor: `${color}04`,
    },
    '&:focus-visible': {
      backgroundColor: `${color}10`,
    },
  };
}
