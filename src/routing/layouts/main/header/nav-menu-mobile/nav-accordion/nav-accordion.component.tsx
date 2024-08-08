import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, Box } from '@mui/material';
import { t } from 'i18next';
import { FC } from 'react';

import {
  StyledAccordionSummary,
  StyledAccordionNavLink,
  StyledAccordion,
} from './nav-accordion.style';
import { NavAccordionProps } from './nav-accordion.types';

export const NavAccordion: FC<NavAccordionProps> = ({
  path,
  menuDisplay,
  childrenRoutes,
  defaultExpanded,
  onRouteClick,
}) => {
  return (
    <StyledAccordion
      defaultExpanded={defaultExpanded}
      sx={{
        boxShadow: 'none',
        padding: '0',
      }}
    >
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon htmlColor={'white'} />}>
        {t(menuDisplay!.label)}
      </StyledAccordionSummary>
      <AccordionDetails>
        {childrenRoutes!
          .filter(child => !child.isIndex)
          .map(child => (
            <StyledAccordionNavLink
              to={`${path}/${child.path}`}
              style={{ textDecoration: 'none' }}
              onClick={() => onRouteClick()}
              key={`${path}/${child.path}`}
            >
              <Box p={1}>{child.menuDisplay?.label && t(child.menuDisplay?.label)}</Box>
            </StyledAccordionNavLink>
          ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};
