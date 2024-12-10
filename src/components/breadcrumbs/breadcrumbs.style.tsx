import { Breadcrumbs, Link, LinkProps, styled } from '@mui/material';

export const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: 0,
  maxWidth: '100%',
  maxHeight: '100%',
  color: theme.palette.primary.main,
  scrollbarWidth: 'thin',
  overflowY: 'auto',

  '& .MuiBreadcrumbs-ol': {
    rowGap: 2,
  },

  '& .MuiBreadcrumbs-li': {
    maxWidth: '100%',
    '&:not(:only-child)': {
      '--separator-width': '21px',
      maxWidth: 'calc(100% - var(--separator-width))',
    },
  },
}));

export const StyledMuiLink = styled(
  (props: Omit<LinkProps, 'children'> & { children?: string }) => (
    <Link underline={'hover'} title={props.children} {...props} />
  ),
)({
  marginBottom: 0,
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
});
