import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getSolversQueryOptions } from '~/api/queries/solvers/get-solvers.query';
import { FormInputText, FormUploadFile } from '~/components/react-hook-form';
import { useGetSolverFile } from '~/use-cases/get-solver-file.hook';
import { getAvailableExtensionsMsg } from '~/utils/files/validate-files';

import { createSolverFormSchema, ISolverForm } from './solver-form.schema';

interface SolverFormProps {
  data?: Omit<ISolverForm, 'file'>;
  projectId: string;
  onReject?: () => void;
  onResolve: (data: ISolverForm) => void;
}

export const SolverForm: FC<SolverFormProps> = ({ data, projectId, onReject, onResolve }) => {
  const { t } = useTranslation();

  const { fileCardProps } = useGetSolverFile(data?.id);

  const { data: solverNames = [] } = useQuery(
    getSolversQueryOptions(projectId, {
      select: solvers => {
        return solvers.filter(s => s.id !== data?.id).map(s => s.name!);
      },
    }),
  );

  const schema = useMemo(() => createSolverFormSchema(solverNames), [solverNames]);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ISolverForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data ? { ...data, file: fileCardProps ?? null } : undefined,
    defaultValues: schema.getDefault(),
    resolver: yupResolver(schema),
  });

  return (
    <Form showColonAfterLabel onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText isMultiline controllerProps={{ ...register('description'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.FILE')} isRequired>
        <FormUploadFile
          variant={'dragger'}
          fileType={'zip'}
          controllerProps={{ ...register('file'), control }}
          draggerDescr={getAvailableExtensionsMsg('zip')}
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
