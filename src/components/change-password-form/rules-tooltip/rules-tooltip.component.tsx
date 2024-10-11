import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from '@pspod/ui-components';
import { FC } from 'react';

import { AccountConfiguration } from '~/api/utils/api-requests';

import { RuleList } from './rule-list/rule-list.component';

export const RulesTooltip: FC<{ config?: AccountConfiguration }> = ({ config }) => {
  if (!config) {
    return <></>;
  }

  return (
    <Tooltip placement={'right'} hasElevation hasArrow content={<RuleList config={config} />}>
      <HelpOutlineIcon fontSize={'inherit'} />
    </Tooltip>
  );
};
