import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  CreateContentNodeRequest,
  CreateContentNodeRequestTypeEnum,
} from '~/api/utils/api-requests';
import { schema } from '~/components/node-form/node-form.schema';
import { selectNodeTypes } from '~/components/node-form/node-form.utils';
import { FormInputText, FormSelect } from '~/components/react-hook-form';
import { FormSearchTree } from '~/components/react-hook-form/form-search-tree/form-search-tree.component';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';
import { Button } from '~/ui-components/button/button.component';
import { Form, FormButtons, FormItem } from '~/ui-components/form';

export interface NodeFormData {
  name?: string;
  type?: CreateContentNodeRequestTypeEnum;
  parentId?: string;
}

interface NodeFormProps {
  data?: NodeFormData;
  onReject?: () => void;
  onResolve: (values: CreateContentNodeRequest) => void;
  isEditing?: boolean;
}

export const NodeForm: FC<NodeFormProps> = ({ onResolve, onReject, data, isEditing = false }) => {
  const { t } = useTranslation();
  const { treeData = [], isLoading } = useTablesMenuData();

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
            placeholder={t('BUTTON.SELECT')}
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
        <Button onClick={onReject}>{t('BUTTON.CANCEL')}</Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!isValid && isSubmitted}
          isLoading={isSubmitting}
        >
          {t('BUTTON.SAVE')}
        </Button>
      </FormButtons>
    </Form>
  );
};
