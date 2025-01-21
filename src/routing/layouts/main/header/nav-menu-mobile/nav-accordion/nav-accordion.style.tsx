import { Accordion, AccordionSummary, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  color: theme.palette.common.white,

  '.MuiAccordionDetails-root': {
    paddingBlock: 0,
    paddingInline: theme.spacing(1),
  },

  '.MuiAccordion-heading': {
    fontSize: '14px',
    fontWeight: 500,
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  paddingInline: theme.spacing(1),

  '&, &.Mui-expanded': {
    height: '35px',
    minHeight: '35px',
  },
  '.MuiAccordionSummary-content': {
    marginBlock: theme.spacing(1),
  },
}));
