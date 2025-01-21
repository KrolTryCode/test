import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, Link as MuiLink } from '@mui/material';
import { FC } from 'react';

import { ExternalLink } from '~/api/utils/api-requests';

import { StyledAccordionSummary, StyledAccordion } from './nav-accordion.style';

interface ExternalLinksAccordionProps {
  title: string;
  links: ExternalLink[];
}

export const ExternalLinksAccordion: FC<ExternalLinksAccordionProps> = ({ title, links }) => {
  return (
    <StyledAccordion disableGutters>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon htmlColor={'white'} />}>
        {title}
      </StyledAccordionSummary>
      <AccordionDetails>
        {links.map(({ name, order, url }) => (
          <MuiLink
            key={order}
            href={url}
            underline={'hover'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            {name}
          </MuiLink>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};
