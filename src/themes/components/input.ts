import { Components, Theme } from '@mui/material/styles';

export const MuiTextField: Components<Omit<Theme, 'components'>>['MuiTextField'] = {
  defaultProps: { fullWidth: true, minRows: 4 },
  styleOverrides: {
    root: ({ theme }) => ({
      '& .Mui-focused .MuiInputAdornment-root': {
        color: theme.palette.primary.main,
      },
      '& .MuiInputAdornment-positionStart': {
        marginRight: 0,
        '& .MuiIcon-root': { marginLeft: '8px' },
      },
    }),
  },
};

export const MuiInputLabel: Components<Omit<Theme, 'components'>>['MuiInputLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: `${theme.palette.text.primary}90`,
      fontSize: '1.3em',
      transform: 'translate(0.4em, -0.7em) scale(0.75)',
      padding: '0 4px',
      width: 'fit-content !important',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
    }),
  },
};

export const MuiFilledInput: Components<Omit<Theme, 'components'>>['MuiFilledInput'] = {
  defaultProps: { disableUnderline: true },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: 0,
      borderRadius: '4px',
      minHeight: '36px',
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}15`,
      },
      '&.Mui-focused': {
        backgroundColor: `${theme.palette.primary.main}20`,
      },
      '&.Mui-disabled': {
        backgroundColor: 'rgba(0,0,0,0.06)',
      },
      '&.Mui-error': {
        backgroundColor: `${theme.palette.error.main}20`,
      },
      '& .MuiButtonBase-root.Mui-focusVisible': {
        borderRadius: theme.shape.borderRadius,
        outline: `1px solid ${theme.palette.primary.main}`,
      },
    }),
    input: ({ theme }) => ({
      borderRadius: '4px',
      height: 'inherit',
      padding: '7px 9px 8px',
      lineHeight: 1.35,
      '&[readonly]:not(.Mui-disabled):not([aria-hidden="true"])': {
        border: `1px dashed ${theme.palette.primary.main}`,
        height: 'calc(100% - 2px)',
      },
    }),
  },
};

export const MuiOutlinedInput: Components<Omit<Theme, 'components'>>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: 0,
      minHeight: '36px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.text.primary}30`,
      },
      '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline':
        {
          borderColor: `${theme.palette.primary.main}50`,
        },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        opacity: '1',
      },
      '&.Mui-error.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main}50`,
      },
      '& .MuiButtonBase-root': {
        borderRadius: theme.shape.borderRadius,
        '&.Mui-focusVisible, &:hover': {
          backgroundColor: `${theme.palette.primary.main}30`,
        },
      },
    }),
    input: {
      padding: '7px 9px 8px',
      lineHeight: 1.35,
      '&[readonly]:not(.Mui-disabled):not([aria-hidden="true"]) ~ .MuiOutlinedInput-notchedOutline':
        {
          borderStyle: 'dashed',
        },
    },
  },
};
