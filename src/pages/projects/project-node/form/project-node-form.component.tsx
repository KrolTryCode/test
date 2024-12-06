import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormButtons, FormItem, modal } from '@pspod/ui-components';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { CreateProjectNodeRequest, ProjectNodeType } from '~/api/utils/api-requests';
import { FormInputText } from '~/components/react-hook-form';
import { FormSearchTree } from '~/components/react-hook-form/form-search-tree/form-search-tree.component';
import { schema } from '~/pages/projects/project-node/form/project-node-form.schema';
import { useProjectsData } from '~/pages/projects/use-projects-data.hook';

interface ProjectNodeFormProps {
  onReject?: () => void;
  data?: Partial<CreateProjectNodeRequest>;
  isEditing?: boolean;
  onResolve: (values: CreateProjectNodeRequest) => void;
}

const ProjectNodeForm: FC<ProjectNodeFormProps> = ({ onResolve, onReject, data, isEditing }) => {
  const { t } = useTranslation();
  const { treeData, isLoading } = useProjectsData();

  const projectList = useMemo(
    () => treeData.filter(v => v.type === ProjectNodeType.Group),
    [treeData],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting, isDirty },
  } = useForm<CreateProjectNodeRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: data ?? schema.getDefault(),
  });

  return (
    <Form onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>
      <FormItem label={t('COMMON.DESCRIPTION')}>
        <FormInputText controllerProps={{ ...register('description'), control }} />
      </FormItem>
      {!!projectList.length && !isEditing && (
        <FormItem label={t('COMMON.PARENT')}>
          <FormSearchTree
            disablePortal={false}
            items={projectList}
            placeholder={t('ACTION.SELECT')}
            noDataText={t('MESSAGE.NO_DATA')}
            isLoading={isLoading}
            controllerProps={{ ...register('parentId'), control }}
          />
        </FormItem>
      )}

      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={(!isValid && isSubmitted) || !isDirty}
          isLoading={isSubmitting}
        >
          {t('ACTION.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};

interface ProjectNodeModalProps {
  title: string;
  data?: Partial<CreateProjectNodeRequest>;
  isEditing?: boolean;
  onSave: (data: CreateProjectNodeRequest) => void;
}

export const projectNodeModal = ({ title, onSave, isEditing, data }: ProjectNodeModalProps) =>
  modal({
    title,
    onOk: onSave,
    renderContent: (args: InstanceProps<CreateProjectNodeRequest, never>) => (
      <ProjectNodeForm data={data} isEditing={isEditing} {...args} />
    ),
  });
