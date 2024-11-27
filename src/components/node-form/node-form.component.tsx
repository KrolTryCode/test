import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormButtons, FormItem, Button } from '@pspod/ui-components';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetProjectNodesTree } from '~/api/queries/nodes/get-project-nodes-tree.query';
import { nodesWithHrefSelector } from '~/api/selectors/nodes-with-href';
import { CreateContentNodeRequest } from '~/api/utils/api-requests';
import { getSchema } from '~/components/node-form/node-form.schema';
import { selectNodeTypes } from '~/components/node-form/node-form.utils';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { FormSearchTree } from '~/components/react-hook-form/form-search-tree/form-search-tree.component';
import { useTreeNodesUtils } from '~/pages/tables/tree/use-tree-nodes-utils.hook';
import { projectsPath, projectPath, tablesPath } from '~/utils/configuration/routes-paths';

interface NodeFormProps {
  data?: Partial<CreateContentNodeRequest>;
  onReject?: () => void;
  onResolve: (values: CreateContentNodeRequest) => void;
  isEditing?: boolean;
}

export const NodeForm: FC<NodeFormProps> = ({ onResolve, onReject, data, isEditing = false }) => {
  const { t } = useTranslation();
  const projectId = data?.projectId ?? '';
  const { data: treeData = [], isLoading } = useGetProjectNodesTree(projectId, {
    enabled: !!projectId,
    select: data =>
      nodesWithHrefSelector(
        data,
        projectId,
        `${projectsPath}/${projectPath}/${projectId}/${tablesPath}`,
      ),
  });

  const { findNode } = useTreeNodesUtils(treeData);

  const getSiblingNames = useCallback(
    (parentNodeId?: string): string[] => {
      if (!parentNodeId) {
        return treeData.map(node => node.label);
      }
      const parentNode = findNode(parentNodeId);
      if (parentNode?.children && parentNode.children.length > 0) {
        return parentNode.children.map(node => node.label);
      }
      return [];
    },
    [treeData, findNode],
  );

  const schema = getSchema(getSiblingNames(data?.parentId), t);
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<CreateContentNodeRequest>({
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

      {!!treeData.length && (
        <FormItem label={t('COMMON.PARENT')}>
          <FormSearchTree
            items={treeData}
            placeholder={t('ACTION.SELECT')}
            noDataText={t('MESSAGE.NO_DATA')}
            isLoading={isLoading}
            controllerProps={{ ...register('parentId'), control }}
          />
        </FormItem>
      )}

      <FormItem label={t('COMMON.TYPE')} isRequired>
        <FormSelect
          disableClearable
          items={selectNodeTypes}
          isReadonly={isEditing}
          controllerProps={{ ...register('type'), control }}
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
