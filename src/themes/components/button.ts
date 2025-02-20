import { Components, Theme, CSSInterpolation, CSSObject } from '@mui/material/styles';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

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
    textPrimary: ({ theme }) => getTextButtonStyles(theme),
    textSecondary: ({ theme }) => ({
      color: theme.palette.text.primary,
      ...getTextButtonStyles(theme),
    }),
    outlinedPrimary: ({ theme }) => getOutlinedButtonStyles(theme, 'primary'),
    containedPrimary: ({ theme }) => getContainedButtonStyles(theme, 'primary'),
    outlinedSecondary: ({ theme }) => getOutlinedButtonStyles(theme, 'secondary'),
    containedSecondary: ({ theme }) => getContainedButtonStyles(theme, 'secondary'),
    outlinedWarning: ({ theme }) => getOutlinedButtonStyles(theme, 'warning'),
    containedWarning: ({ theme }) => getContainedButtonStyles(theme, 'warning'),
    outlinedError: ({ theme }) => getOutlinedButtonStyles(theme, 'error'),
    containedError: ({ theme }) => getContainedButtonStyles(theme, 'error'),
    outlinedSuccess: ({ theme }) => getOutlinedButtonStyles(theme, 'success'),
    containedSuccess: ({ theme }) => getContainedButtonStyles(theme, 'success'),
  },
};

function getContainedButtonStyles(
  theme: Omit<Theme, 'components'>,
  type: ButtonType,
): CSSInterpolation {
  return {
    '&, &.Mui-disabled': {
      backgroundColor: theme.palette[type].main,
      borderColor: theme.palette[type].main,
      '&:not(.MuiLoadingButton-loading)': { color: theme.palette.common.white },
    },
    '& .MuiLoadingButton-loadingIndicator': {
      color: theme.palette.common.white,
    },
    '&:hover, &:focus-visible': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette[type].dark,
      borderColor: theme.palette[type].dark,
    },
    '&:active': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette[type].light,
      borderColor: theme.palette[type].light,
    },
  };
}

function getOutlinedButtonStyles(
  theme: Omit<Theme, 'components'>,
  type: ButtonType,
): CSSInterpolation {
  return {
    '&, &.Mui-disabled, & .MuiLoadingButton-loadingIndicator': {
      color: theme.palette[type].main,
      borderColor: theme.palette[type].main,
    },
    '&:hover, &:focus-visible': {
      color: theme.palette.common.white,
      backgroundColor: `${theme.palette[type].main}`,
    },
    '&:active': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette[type].dark,
    },
  };
}

function getTextButtonStyles(theme: Omit<Theme, 'components'>): CSSObject {
  return {
    '&:hover, &:focus-visible': { backgroundColor: `${theme.palette.primary.main}04` },
    '&:active': { backgroundColor: `${theme.palette.primary.main}10` },
  };
}
