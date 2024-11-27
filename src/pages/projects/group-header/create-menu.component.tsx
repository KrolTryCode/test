import { Upload, Folder, BackupTable, Add as AddIcon } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { Button, DropdownMenu } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useProjectsTreeActions } from '~/pages/projects/use-projects-tree-actions.hook';

export const CreateMenu: FC = () => {
  const { t } = useTranslation();
  const { addGroup, addProject } = useProjectsTreeActions();

  return (
    <>
      <DropdownMenu
        buttonColor={'primary'}
        buttonSize={'small'}
        buttonContent={<AddIcon fontSize={'small'} />}
      >
        <MenuItem onClick={addGroup}>
          <Folder color={'primary'} fontSize={'small'} />
          &nbsp;&nbsp;&nbsp;{t('ENTITY.GROUP')}
        </MenuItem>
        <MenuItem onClick={addProject}>
          <BackupTable color={'primary'} fontSize={'small'} />
          &nbsp;&nbsp;&nbsp;{t('ENTITY.PROJECT')}
        </MenuItem>
      </DropdownMenu>

      <Button
        size={'small'}
        color={'primary'}
        title={t('ACTION.IMPORT', { what: t('ENTITY.PROJECT').toLowerCase() })}
        onClick={() => alert('Всё будет')}
        variant={'text'}
        icon={<Upload />}
      />
    </>
  );
};
