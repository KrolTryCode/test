import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails } from '@mui/material';
import { t } from 'i18next';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { StyledAccordionSummary, StyledAccordion } from './nav-accordion.style';
import { NavAccordionProps } from './nav-accordion.types';

export const NavAccordion: FC<NavAccordionProps> = ({
  path,
  title,
  childrenRoutes,
  defaultExpanded,
  onRouteClick,
}) => {
  return (
    <StyledAccordion disableGutters defaultExpanded={defaultExpanded}>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon htmlColor={'white'} />}>
        {title}
      </StyledAccordionSummary>
      <AccordionDetails>
        {childrenRoutes
          .filter(child => !child.isIndex)
          .map(child => (
            <NavLink
              to={`${path}/${child.path}`}
              style={{ textDecoration: 'none' }}
              onClick={onRouteClick}
              key={`${path}/${child.path}`}
            >
              {child.menuDisplay?.label && t(child.menuDisplay?.label)}
            </NavLink>
          ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};
