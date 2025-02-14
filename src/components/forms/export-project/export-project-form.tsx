import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getPermissionTypesQueryOptions } from '~/api/queries/projects/get-available-permission-types.query';
import { FormCheckboxGroup } from '~/components/react-hook-form/form-checkbox/form-checkbox-group.component';

const allProjectPermissions = [
  'ContentNode',
  'Solver',
  'ProjectSolver',
  'ParameterForm',
  'ProjectParameterForm',
  'Task',
];

interface ExportProjectFormProps {
  projectId: string;
  onSave: (data: string[]) => void;
  onReject: () => void;
  isPending?: boolean;
}

export const ExportProjectForm: FC<ExportProjectFormProps> = ({
  projectId,
  onSave,
  onReject,
  isPending,
}) => {
  const { t } = useTranslation();

  const { data: allowedPermissions = [], isLoading } = useQuery(
    getPermissionTypesQueryOptions(projectId, {
      select: data => {
        return data.filter(v => allProjectPermissions.includes(v));
      },
    }),
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<{ types: string[] }>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: { types: allowedPermissions },
  });

  return (
    <Form
      showColonAfterLabel
      isRequired
      isLoading={isLoading}
      onSubmit={handleSubmit(({ types }) => onSave(types))}
    >
      <FormItem label={t('PROJECT.SELECT_PERMISSIONS')}>
        <FormCheckboxGroup
          items={allProjectPermissions.map(type => {
            const isAllowed = allowedPermissions?.includes(type);
            return {
              id: type,
              label: String(t(`PROJECT.PERMISSIONS.${type.toUpperCase()}`)),
              isDisabled: !isAllowed,
              title: !isAllowed ? String(t('PERMISSIONS.NO_PERMISSIONS')) : undefined,
            };
          })}
          controllerProps={{
            ...register('types'),
            control,
            rules: { required: { message: t('yup:mixed.required'), value: true } },
          }}
        />
      </FormItem>
      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          variant={'contained'}
          color={'primary'}
          isLoading={isPending}
        >
          {t('ACTION.EXPORT')}
        </Button>
      </FormButtons>
    </Form>
  );
};
