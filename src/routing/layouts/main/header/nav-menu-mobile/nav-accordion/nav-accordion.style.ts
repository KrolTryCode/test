import { Accordion, AccordionSummary } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const StyledAccordionSummary = styled(AccordionSummary)(
  ({ theme }) => `
  height: 30px;
  min-height: 30px !important;
  padding: 0 0 0 5px !important;
  font-size: 14px;
  font-weight: 500;
  color: white !important;
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
`,
);

export const StyledAccordionNavLink = styled(NavLink)(
  ({ theme }) => `
  display: flex;
  padding: 5px;
  font-size: 14px;
  color: white !important;
  text-decoration: none;
  text-wrap: nowrap;

  &.active {
    color: ${theme.palette.primary.main} !important;
    background: white;
    border-radius: 5px;
  }
`,
);
