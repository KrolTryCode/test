import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails } from '@mui/material';
import { Route, Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { FC } from 'react';

import { StyledAccordionSummary, StyledAccordion } from './nav-accordion.style';

interface NavAccordionProps {
  title: string;
  childrenRoutes: Route[];
  defaultExpanded: boolean;
  onRouteClick: () => void;
}

export const NavAccordion: FC<NavAccordionProps> = ({
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
        {childrenRoutes.map(child => (
          // @ts-expect-error todo: to
          <Link to={child.fullPath} onClick={onRouteClick} key={child.fullPath}>
            {t(child.options.staticData!.title!)}
          </Link>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};
