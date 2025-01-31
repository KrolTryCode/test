import { Folder, TableChart, Add as AddIcon } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { DropdownMenu } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateNodeContentMenuProps {
  addCatalog: () => void;
  addTable: () => void;
}

export const CreateNodeContentMenu: FC<CreateNodeContentMenuProps> = ({ addCatalog, addTable }) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu buttonColor={'primary'} buttonContent={<AddIcon fontSize={'small'} />}>
      <MenuItem onClick={addCatalog}>
        <Folder color={'primary'} fontSize={'small'} />
        &nbsp;&nbsp;&nbsp;{t('ENTITY.DIRECTORY')}
      </MenuItem>
      <MenuItem onClick={addTable}>
        <TableChart color={'primary'} fontSize={'small'} />
        &nbsp;&nbsp;&nbsp;{t('ENTITY.TABLE')}
      </MenuItem>
    </DropdownMenu>
  );
};
