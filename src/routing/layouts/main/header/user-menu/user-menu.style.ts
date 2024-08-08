import { MenuItem, MenuItemProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  width: '230px',
  padding: '10px 15px !important',
  borderLeft: '1px solid',
  borderRight: '1px solid',
  // в консоли настойчиво предлагает сменить first-child на first-of-type, что не подходит
  // '&:first-child': {
  '&:is(a)': {
    borderTop: '1px solid',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
  },

  '&:is(li)': {
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
  },

  borderColor: theme.palette.primary.main,
}));
