import { Components, Theme, CSSInterpolation, CSSObject } from '@mui/material/styles';

import { Color } from '~/themes/theme-overrides';

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
      '&[hidden]': { visibility: 'hidden' },
      '&.Mui-disabled': { opacity: 0.5 },
      '& svg': { fill: 'currentColor' },
      '&.icon-button .MuiButton-startIcon': { margin: 0 },
    },
    textPrimary: ({ theme }) => getTextButtonStyles(theme.palette.primary.main),
    textSecondary: ({ theme }) => ({
      color: theme.palette.text.primary,
      ...getTextButtonStyles(theme.palette.text.primary),
    }),
    outlinedPrimary: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.primary.main,
        white: theme.palette.common.white,
        ...theme.palette.button.primary,
      }),
    containedPrimary: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.primary.main,
        white: theme.palette.common.white,
        ...theme.palette.button.primary,
      }),
    outlinedSecondary: ({ theme }) => ({
      color: theme.palette.secondary.main,
      borderColor: theme.palette.button.secondary.outlined.border,
      '&:hover': {
        borderColor: theme.palette.button.secondary.outlined.border,
        backgroundColor: theme.palette.button.secondary.outlined.hover,
      },
      '&:focus-visible': {
        borderColor: theme.palette.button.secondary.outlined.border,
        backgroundColor: theme.palette.button.secondary.outlined.focus,
      },
      '&:active': {
        borderColor: theme.palette.button.secondary.outlined.border,
        backgroundColor: theme.palette.button.secondary.outlined.active,
      },
    }),
    containedSecondary: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.secondary.main,
        hover: theme.palette.button.secondary.contained.hover,
        focus: theme.palette.button.secondary.contained.focus,
        active: theme.palette.button.secondary.contained.active,
        white: theme.palette.common.white,
      }),
    outlinedWarning: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.warning.main,
        white: theme.palette.common.white,
        ...theme.palette.button.warning,
      }),
    containedWarning: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.warning.main,
        white: theme.palette.common.white,
        ...theme.palette.button.warning,
      }),
    outlinedError: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.error.main,
        white: theme.palette.common.white,
        ...theme.palette.button.error,
      }),
    containedError: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.error.main,
        white: theme.palette.common.white,
        ...theme.palette.button.error,
      }),
    outlinedSuccess: ({ theme }) =>
      getOutlinedButtonStyles({
        main: theme.palette.success.main,
        white: theme.palette.common.white,
        ...theme.palette.button.success,
      }),
    containedSuccess: ({ theme }) =>
      getContainedButtonStyles({
        main: theme.palette.success.main,
        white: theme.palette.common.white,
        ...theme.palette.button.success,
      }),
  },
};

interface Colors extends Color {
  main: string;
  white: string;
}

function getContainedButtonStyles({ main, hover, focus, active, white }: Colors): CSSInterpolation {
  return {
    '&, &.Mui-disabled': {
      backgroundColor: main,
      borderColor: main,
      '&:not(.MuiLoadingButton-loading)': { color: white },
    },
    '& .MuiLoadingButton-loadingIndicator': { color: white },
    '&:hover': { color: white, backgroundColor: hover, borderColor: hover },
    '&:active': { color: white, backgroundColor: active, borderColor: active },
    '&:focus-visible': { color: white, backgroundColor: focus, borderColor: focus },
  };
}

function getOutlinedButtonStyles({ main, hover, focus, active, white }: Colors): CSSInterpolation {
  return {
    '&, &.Mui-disabled, & .MuiLoadingButton-loadingIndicator': { color: main, borderColor: main },
    '&:hover': { color: white, backgroundColor: hover, borderColor: hover },
    '&:active': { color: white, backgroundColor: active, borderColor: active },
    '&:focus-visible': { color: white, backgroundColor: focus, borderColor: focus },
  };
}

function getTextButtonStyles(color: string): CSSObject {
  return {
    '&:hover': { backgroundColor: `${color}04` },
    '&:focus-visible': { backgroundColor: `${color}10` },
  };
}
