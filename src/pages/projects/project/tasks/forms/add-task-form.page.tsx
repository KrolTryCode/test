import { Stack, Typography } from '@mui/material';
import { notifySuccess } from '@pspod/ui-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateFormMutation } from '~/api/tasks/forms/create-form.mutation';
import { TaskForm } from '~/pages/projects/project/tasks/forms/task-form.component';
import { projectsPath, projectPath, formsPath } from '~/utils/configuration/routes-paths';
import { useDeclinatedTranslationsContext } from '~/utils/configuration/translations/declinated-translations-provider';
import { showErrorMessage } from '~/utils/show-error-message';

const AddTaskFormPage: FC = () => {
  const { projectId = '' } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createForm } = useCreateFormMutation(projectId, {
    onSuccess: () => {
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
      navigate(`/${projectsPath}/${projectPath}/${projectId}/${formsPath}`);
    },
    onError: e => {
      showErrorMessage(e, t('ERROR.CREATION_FAILED'));
    },
  });
  const declinatedTranslations = useDeclinatedTranslationsContext();
  const declinatedForm = declinatedTranslations.FORM.ACCUSATIVE.toLowerCase();

  return (
    <Stack padding={1} gap={2} sx={{ overflowY: 'auto', height: '100%', scrollbarWidth: 'thin' }}>
      <Typography variant={'h2'} component={'h3'}>
        {t('ACTION.ADD', { type: declinatedForm })}
      </Typography>
      <TaskForm onSave={createForm} />
    </Stack>
  );
};

export default AddTaskFormPage;
