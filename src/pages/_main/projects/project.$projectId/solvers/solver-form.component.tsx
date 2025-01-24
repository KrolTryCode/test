import { yupResolver } from '@hookform/resolvers/yup';
import { CloudDownload } from '@mui/icons-material';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Solver, SolverRequest } from '~/api/utils/api-requests';
import { FormInputFile, FormInputText } from '~/components/react-hook-form';
import { createSolverFormSchema } from '~/pages/_main/projects/project.$projectId/solvers/solver-form.schema';
import { useSolverForm } from '~/pages/_main/projects/project.$projectId/solvers/use-solver-form.hook';
import { downloadBlobFile } from '~/utils/files';

export interface SolverUpdateRequest extends SolverRequest {
  fileId?: string;
}

interface SolverFormProps {
  data?: Solver;
  projectId: string;
  onReject?: () => void;
  onResolve: (data: SolverUpdateRequest) => void;
  isEditing?: boolean;
}

export const SolverForm: FC<SolverFormProps> = ({
  data,
  projectId,
  onReject,
  onResolve,
  isEditing = false,
}) => {
  const { t } = useTranslation();

  const schema = useMemo(() => createSolverFormSchema(isEditing), [isEditing]);

  const {
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<SolverUpdateRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: data ?? schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { solverFile, currentFile, uploadFile, createSolverFile, isFetching } = useSolverForm(
    projectId,
    data,
    isEditing,
    resetField,
  );

  useEffect(() => {
    if (solverFile?.fileId) {
      setValue('fileId', solverFile.fileId);
    }
  }, [setValue, solverFile?.fileId]);

  const onChangeFile = useCallback(
    async (file: File | undefined) => {
      if (file) {
        const { fileId } = await createSolverFile(file);
        if (fileId) {
          await uploadFile({ file, fileId });
        }
      }
    },
    [createSolverFile, uploadFile],
  );

  return (
    <Form onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText isMultiline controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.FILE')} isRequired isHidden={!isEditing}>
        <FormInputFile
          accept={'.zip'}
          isLoading={isFetching}
          onChangeFile={onChangeFile}
          initialFilename={solverFile?.fileName}
          controllerProps={{ ...register('fileId'), control }}
        />
        <Button
          hidden={!currentFile}
          icon={<CloudDownload />}
          sx={{ marginTop: 1 }}
          onClick={() =>
            downloadBlobFile(currentFile, solverFile?.fileName ?? `${t('ENTITY.SOLVER')}.zip`)
          }
        >
          {t('ACTION.DOWNLOAD_ATTACHED_FILE')}
        </Button>
      </FormItem>
      <FormButtons>
        <Button onClick={onReject}>{t('ACTION.CANCEL')}</Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
