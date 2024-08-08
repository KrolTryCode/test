import { Components, Theme } from '@mui/material/styles';

export const MuiAutocomplete: Components<Omit<Theme, 'components'>>['MuiAutocomplete'] = {
  defaultProps: { fullWidth: true },
  styleOverrides: {
    root: ({ theme }) => ({
      maxWidth: '500px',
      '& .MuiInputBase-root .MuiAutocomplete-endAdornment': {
        right: 0,
        '& .MuiSvgIcon-root': {
          fontSize: '0.8em',
        },
      },
      '&.Mui-expanded .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover, &.Mui-focused': {
        '& .MuiAutocomplete-popupIndicator': {
          backgroundColor: `${theme.palette.text.primary}20`,
        },
      },
    }),
    noOptions: ({ theme }) => ({
      color: theme.palette.text.primary,
    }),
    fullWidth: { maxWidth: '100%' },
    inputRoot: {
      padding: 0,
      minHeight: '36px',
      '& .MuiAutocomplete-input': {
        padding: '7px 9px 8px',
        lineHeight: 1.35,
      },
    },
    input: {
      '&:read-only ~ .MuiAutocomplete-endAdornment': {
        visibility: 'hidden',
      },
    },
    popupIndicator: {
      margin: '2px 2px 2px 6px',
      color: 'inherit',
      width: '32px',
      height: '32px',
      borderRadius: '4px',
    },
    clearIndicator: ({ theme }) => ({
      color: `${theme.palette.text.primary}80`,
    }),
    listbox: {
      padding: 0,
      '& .MuiAutocomplete-option': {
        padding: '7px 9px',

        '&[aria-selected="true"]': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },

        '&[aria-selected="true"].Mui-focused': {
          backgroundColor: 'rgba(0,0,0,0.04)',
        },
      },
    },
  },
};
