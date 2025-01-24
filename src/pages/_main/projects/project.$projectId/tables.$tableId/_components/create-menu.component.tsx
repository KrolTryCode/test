import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Button, DropdownMenu } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavTreeActions } from './use-nav-tree-actions.hook';

export const CreateMenu: FC = () => {
  const { handleAddCatalog, handleAddTable } = useNavTreeActions([]);
  const { t } = useTranslation();

  return (
    <DropdownMenu buttonColor={'primary'} buttonContent={<AddIcon fontSize={'small'} />}>
      <Stack>
        <Button color={'primary'} onClick={() => handleAddCatalog()} variant={'text'}>
          {t('ENTITY.DIRECTORY')}
        </Button>

        <Button color={'primary'} onClick={() => handleAddTable()} variant={'text'}>
          {t('ENTITY.TABLE')}
        </Button>
      </Stack>
    </DropdownMenu>
  );
};
