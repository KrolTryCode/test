import { Folder, BackupTable, Add as AddIcon } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { DropdownMenu, UploadFileButton } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateNodeActions } from './create-node-menu.hook';

export const CreateNodeMenu: FC = () => {
  const { t } = useTranslation();
  const { addGroup, addProject, importProject, isUploadingProject } = useCreateNodeActions();

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

      <UploadFileButton
        accept={'.zip'}
        size={'small'}
        color={'primary'}
        title={t('ACTION.IMPORT', { what: t('ENTITY.PROJECT').toLowerCase() })}
        onSelect={importProject}
        variant={'text'}
        isLoading={isUploadingProject}
        iconButton
      />
    </>
  );
};
