import { Done } from '@mui/icons-material';
import { Box } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentNodeTypeEnum } from '~/api/utils/api-requests';
import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';
import { Button } from '~/ui-components/button/button.component';
import { Tooltip } from '~/ui-components/tooltip/tooltip.component';

export const SelectItemButton: FC<{
  item: NavTreeItemData;
  onHandleSelect: (itemId: string) => void;
}> = ({ item, onHandleSelect }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={item.type === ContentNodeTypeEnum.Table && t('MESSAGE.CANNOT_CREATE_NODE_BY_PARENT')}
      variant={'dark'}
      placement={'right'}
      hasArrow
    >
      <Box>
        <Button
          color={'success'}
          size={'small'}
          icon={<Done />}
          onClick={() => onHandleSelect?.(item.id)}
          disabled={item.type === ContentNodeTypeEnum.Table}
          sx={{ borderRadius: '12px', padding: '0 0.7em', marginLeft: 1 }}
        >
          {t('ACTION.SELECT')}
        </Button>
      </Box>
    </Tooltip>
  );
};
