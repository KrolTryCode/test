import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: "'IBM Plex Sans', 'Segoe UI', 'helvetica', 'verdana', 'sans-serif'",
  // TODO: dx-тема перезаписывает mui-тему, поэтому `!important`, после удалить
  h1: {
    fontSize: '28px !important',
    fontWeight: '700 !important',
  },
  h2: {
    fontSize: '24px !important',
    fontWeight: '700 !important',
  },
  h3: {
    fontSize: '22px !important',
    fontWeight: '700 !important',
  },
  h4: {
    fontSize: '18px !important',
    fontWeight: '700 !important',
  },
  h5: {
    fontSize: '16px !important',
    fontWeight: '700 !important',
  },
  h6: {
    fontSize: '14px !important',
    fontWeight: '700 !important',
  },
  subtitle1: {
    fontSize: '20px !important',
    fontWeight: '600 !important',
  },
  subtitle2: {
    fontSize: '16px !important',
    fontWeight: '500 !important',
  },
  body1: { fontSize: '14px' },
};
