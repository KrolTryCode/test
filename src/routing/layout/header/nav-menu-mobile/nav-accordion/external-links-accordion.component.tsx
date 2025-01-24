import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, Link as MuiLink } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useGetExternalLinksQuery } from '~/api/queries/settings/get-external-links.query';

import { StyledAccordionSummary, StyledAccordion } from './nav-accordion.style';

export const ExternalLinksAccordion = () => {
  const { t } = useTranslation();

  const { data: links = [] } = useGetExternalLinksQuery({
    select: data => data.links,
  });

  if (!links.length) {
    return;
  }

  return (
    <StyledAccordion disableGutters>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon htmlColor={'white'} />}>
        {t('ENTITY.EXTERNAL_SERVICES')}
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
