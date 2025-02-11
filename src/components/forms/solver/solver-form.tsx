import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetSolversQuery } from '~/api/queries/solvers/get-solvers.query';
import { Solver } from '~/api/utils/api-requests';
import { UploadFile } from '~/components/inputs/upload-file/upload-file.component';
import { LabelWithRules } from '~/components/label-with-rules/label-with-rules.component';
import { FormInputText } from '~/components/react-hook-form';
import { downloadBlobFile } from '~/utils/files';
import { getAvailableExtensionsMsg } from '~/utils/files/validate-files';

import { useSolverForm } from './solver-form.hook';
import { createSolverFormSchema, SolverUpdateRequest } from './solver-form.schema';

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

  const { data: solverNames = [] } = useGetSolversQuery(projectId, {
    select: solvers => {
      return solvers.filter(s => s.id !== data?.id).map(s => s.name!);
    },
  });

  const schema = useMemo(
    () => createSolverFormSchema(solverNames, isEditing),
    [solverNames, isEditing],
  );

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
    values: data,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { solverFile, currentFile, onChangeFile, isUploadingFile } = useSolverForm(
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

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText isMultiline controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem
        label={
          <LabelWithRules label={t('COMMON.FILE')} content={getAvailableExtensionsMsg('zip')} />
        }
        isRequired
        isHidden={!isEditing}
      >
        <UploadFile
          fileType={'zip'}
          onSelect={onChangeFile}
          isUploading={isUploadingFile}
          files={solverFile ? [{ id: solverFile.fileId!, name: solverFile.fileName! }] : []}
          onDownloadFile={() =>
            downloadBlobFile(currentFile, solverFile?.fileName ?? `${t('ENTITY.SOLVER')}.zip`)
          }
        />
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
