import { Box, BoxProps, styled } from '@mui/material';

export const StyledTable = styled((props: BoxProps) => (
  <Box width={'fit-content'} {...props} component={'table'} />
))(({ theme }) => ({
  borderCollapse: 'collapse',

  tr: {
    textWrap: 'balance',
    lineHeight: 1.2,
    fontVariantNumeric: 'slashed-zero',

    '&:hover': {
      backgroundColor: `${theme.palette.secondary.light}10`,
    },
  },

  'th, td': {
    paddingBlock: theme.spacing(1 / 2),
    paddingInline: theme.spacing(1),
  },

  th: {
    textAlign: 'right',
  },
}));
