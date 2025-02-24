import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { Solver } from '~/api/utils/api-requests';
import { UploadFile } from '~/components/inputs/upload-file/upload-file.component';
import { FormInputText } from '~/components/react-hook-form';
import { calcFileSize } from '~/utils/files/calc-file-size';
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

  const { data: solverNames = [] } = useQuery(
    getSolversQueryOptions(projectId, {
      select: solvers => {
        return solvers.filter(s => s.id !== data?.id).map(s => s.name!);
      },
    }),
  );

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

  const { file, onDownloadFile, onChangeFile, isUploadingFile } = useSolverForm(
    projectId,
    data,
    isEditing,
    resetField,
  );

  useEffect(() => {
    if (file?.fileId) {
      setValue('fileId', file.fileId);
    }
  }, [setValue, file?.fileId]);

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText isMultiline controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.FILE')} isRequired isHidden={!isEditing}>
        <UploadFile
          variant={'dragger'}
          fileType={'zip'}
          onSelect={onChangeFile}
          isUploading={isUploadingFile}
          draggerDescr={getAvailableExtensionsMsg('zip')}
          files={
            file
              ? [
                  {
                    id: file.fileId!,
                    name: file.fileName!,
                    description: `${t('COMMON.SIZE')}: ${calcFileSize(file.file.size)}`,
                  },
                ]
              : []
          }
          onDownloadFile={onDownloadFile}
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
