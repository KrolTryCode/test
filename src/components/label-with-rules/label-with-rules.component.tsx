import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Stack } from '@mui/material';
import { Tooltip } from '@pspod/ui-components';
import { FC, ReactNode } from 'react';

interface LabelWithRulesProps {
  label: ReactNode;
  content: ReactNode;
}

export const LabelWithRules: FC<LabelWithRulesProps> = ({ label, content }) => {
  return (
    <Stack display={'inline-flex'} direction={'row'} alignItems={'center'} gap={0.5}>
      <span>{label}</span>
      <Tooltip content={content} placement={'right'} hasArrow hasElevation>
        <HelpOutlineIcon fontSize={'inherit'} />
      </Tooltip>
    </Stack>
  );
};
