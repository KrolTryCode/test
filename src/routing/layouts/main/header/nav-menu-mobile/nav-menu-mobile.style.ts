import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { styled } from '@mui/material/styles';

import { StyledAccordionNavLink } from './nav-accordion/nav-accordion.style';

export const StyledMenuIcon = styled(MenuIcon)`
  margin: auto;
  font-size: 40px;
  color: white;
  cursor: pointer;
`;

export const StyledMenuOpenIcon = styled(MenuOpenIcon)`
  margin: auto;
  font-size: 40px;
  color: white;
  cursor: pointer;
`;

export const StyledMenuNavLink = styled(StyledAccordionNavLink)`
  &.active {
    padding: 12px 10px;
  }
`;
