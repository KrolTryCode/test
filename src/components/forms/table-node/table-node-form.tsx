import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormButtons, FormItem, Button, Preloader } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getContentNodesByParentQueryOptions } from '~/api/queries/project-content/get-content-nodes-by-parent.query';
import { ContentNodeType, CreateContentNodeRequest } from '~/api/utils/api-requests';
import { getSchema } from '~/components/forms/table-node/table-node-form.schema';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { FormSelectContentNode } from '~/components/react-hook-form/form-search-content-node/form-search-node-tree.component';
import { useCustomTranslations } from '~/utils/hooks/use-custom-translations';

export interface TableNodeFormProps {
  data?: Partial<CreateContentNodeRequest>;
  onReject?: () => void;
  onResolve: (values: CreateContentNodeRequest) => void;
  isEditing?: boolean;
  projectId?: string;
  currentNodeId: string | undefined;
}

export const TableNodeForm: FC<TableNodeFormProps> = ({
  onResolve,
  onReject,
  data,
  currentNodeId,
  isEditing = false,
  projectId = '',
}) => {
  const { t, translateEntity } = useCustomTranslations();
  const [selectedItem, setSelectedItem] = useState(currentNodeId);

  const { data: siblingNames = [], isLoading } = useQuery(
    getContentNodesByParentQueryOptions(projectId, selectedItem, {
      select: data => data.map(node => node.name),
    }),
  );

  const schema = useMemo(() => getSchema(siblingNames, t), [siblingNames, t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<CreateContentNodeRequest>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: data ?? schema.getDefault(),
  });

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Form onSubmit={handleSubmit(onResolve)}>
      <FormItem label={t('COMMON.TITLE')} isRequired>
        <FormInputText controllerProps={{ ...register('name'), control }} />
      </FormItem>

      {!isEditing && (
        <FormItem label={t('COMMON.PARENT')}>
          <FormSelectContentNode
            controllerProps={{ ...register('parentContentNodeId'), control }}
            projectId={projectId}
            onChange={setSelectedItem}
            showRoot
            /*
              TODO: pass path to selected node (https://tracker.yandex.ru/BE-220)
              example src/components/trees/app-group-select-tree
            */
            pathToSelected={[]}
            canSelectItem={({ type }) => type === ContentNodeType.Directory}
            isMultiple={false}
          />
        </FormItem>
      )}

      <FormItem label={t('COMMON.TYPE')} isRequired>
        <FormSelect
          disableClearable
          items={Object.values(ContentNodeType)}
          translateItemsFunction={translateEntity}
          isReadonly={isEditing}
          controllerProps={{ ...register('type'), control }}
        />
      </FormItem>

      <FormButtons>
        <Button onClick={onReject} variant={'outlined'} color={'primary'}>
          {t('ACTION.CANCEL')}
        </Button>
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
