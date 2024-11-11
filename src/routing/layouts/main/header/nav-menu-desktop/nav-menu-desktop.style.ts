import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const StyledHeaderNav = styled('nav')(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  max-width: 100%;
  margin-left: ${theme.spacing(2)};
  overflow-x: auto;
  scrollbar-color: white ${theme.palette.primary.main};
  scrollbar-width: thin;
`,
);

export const StyledHeaderNavLink = styled(NavLink)(
  ({ theme }) => `
  height: 2.5em;
  padding: 0 15px;
  margin: 12px 4px 0;
  font-size: 16px;
  line-height: 2.5em;
  color: white !important;
  text-decoration: none;
  white-space: nowrap;

  &.active {
    color: ${theme.palette.primary.main} !important;
    background: white;
    border-radius: 5px;
  }
`,
);
