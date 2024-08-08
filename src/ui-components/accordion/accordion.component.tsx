import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion as MAccordion,
  AccordionProps as MAccordionProps,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AccordionProps } from '~/ui-components/accordion/accordion.types';

// https://mui.com/material-ui/react-accordion/#performance
const slotProps: MAccordionProps['slotProps'] = {
  transition: {
    unmountOnExit: true,
    timeout: { enter: 300, appear: 0 },
  },
};

export const Accordion: FC<AccordionProps> = ({ text, content, disabled = false }) => {
  const { t } = useTranslation();

  return (
    <MAccordion slotProps={slotProps} disabled={disabled}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={500}>{text}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content ?? t('MESSAGE.NO_DATA')}</AccordionDetails>
    </MAccordion>
  );
};
