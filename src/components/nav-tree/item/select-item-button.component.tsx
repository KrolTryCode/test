import { Done } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Tooltip, Button } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { isFolderType } from '~/components/nav-tree/item/nav-tree-item.utils';
import { NavTreeItemData } from '~/components/nav-tree/nav-tree.type';

export const SelectItemButton: FC<{
  item: NavTreeItemData;
  onHandleSelect: (itemId: string) => void;
}> = ({ item, onHandleSelect }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={!isFolderType(item.type) && t('MESSAGE.CANNOT_CREATE_NODE_BY_PARENT')}
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
          disabled={!isFolderType(item.type)}
          sx={{ borderRadius: '12px', padding: '0 0.7em', marginLeft: 1 }}
        >
          {t('ACTION.SELECT')}
        </Button>
      </Box>
    </Tooltip>
  );
};
