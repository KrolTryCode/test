import { Upload } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { Button, DropdownMenu } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useProjectsTreeActions } from '~/pages/projects/use-projects-tree-actions.hook';

export const CreateMenu: FC = () => {
  const { t } = useTranslation();
  const { addGroup, addProject } = useProjectsTreeActions();

  return (
    <>
      <DropdownMenu buttonSize={'small'} buttonColor={'primary'} buttonContent={<AddIcon />}>
        <Stack>
          <Button color={'primary'} onClick={addGroup} variant={'text'}>
            {t('ENTITY.GROUP')}
          </Button>

          <Button color={'primary'} onClick={addProject} variant={'text'}>
            {t('ENTITY.PROJECT')}
          </Button>
        </Stack>
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
