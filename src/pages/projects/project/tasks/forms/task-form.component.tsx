import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem } from '@pspod/ui-components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { TaskFormData, TaskFormInput } from '~/api/mocks/forms/types';
import { useGetProjectNodesTree } from '~/api/queries/nodes/get-project-nodes-tree.query';
import { useGetSolversQuery } from '~/api/queries/solvers/get-solvers.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { FormSearchTree } from '~/components/react-hook-form/form-search-tree/form-search-tree.component';
import { ParametersTable } from '~/pages/projects/project/tasks/forms/parameters/parameters.component';
import { schema } from '~/pages/projects/project/tasks/forms/task-form.schema';
import {
  projectsPath,
  projectPath,
  tablesPath,
  formsPath,
} from '~/utils/configuration/routes-paths';

interface TaskFormProps {
  data?: TaskFormData;
  onSave: (form: TaskFormInput) => void;
  isLoading?: boolean;
  isPending?: boolean;
}

export const TaskForm: FC<TaskFormProps> = ({
  data,
  isLoading = false,
  isPending = false,
  onSave,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<TaskFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: data ?? schema.getDefault(),
    resolver: yupResolver(schema),
  });

  const { projectId = '' } = useParams();

  const { data: solvers = [] } = useGetSolversQuery(projectId, { enabled: !!projectId });
  const { data: treeData = [], isLoading: isTreeLoading } = useGetProjectNodesTree(projectId, {
    enabled: !!projectId,
    select: data =>
      nodesWithHrefSelector(
        data,
        projectId,
        `${projectsPath}/${projectPath}/${projectId}/${tablesPath}`,
      ),
  });

  const backPath = `/${projectsPath}/${projectPath}/${projectId}/${formsPath}`;

  return (
    <Form
      showColonAfterLabel
      labelPosition={'left'}
      labelWidth={4}
      gap={1}
      onSubmit={handleSubmit(onSave)}
      isLoading={isLoading || isTreeLoading}
      maxWidth={'900px'}
    >
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('ENTITY.SOLVER')} isDisabled>
        <FormSelect items={solvers} controllerProps={{ ...register('solverId'), control }} />
      </FormItem>
      <FormItem label={t('NAVIGATION.TABLES')} isDisabled>
        <FormSearchTree
          items={treeData}
          placeholder={t('ACTION.SELECT')}
          noDataText={t('MESSAGE.NO_DATA')}
          isLoading={isLoading}
          controllerProps={{ ...register('tableIds'), control }}
        />
      </FormItem>
      <FormItem label={t('FORM.MODELLING_TIME')} isDisabled>
        <FormInputText controllerProps={{ ...register('modellingTime'), control }} />
      </FormItem>

      {data && <ParametersTable formId={data.id} parameters={data.parameters} />}

      <FormButtons marginTop={2} isSticky>
        <Button component={Link} to={backPath}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          disabled={!isValid && isSubmitted}
          isLoading={isPending}
          variant={'contained'}
          color={'primary'}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
