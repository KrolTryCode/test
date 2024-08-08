import { GridColumnGroupingModel, GridColumnNode, isLeaf } from '@mui/x-data-grid-premium';

export const serviceRowGroupPrefix = '__row_group_by_columns_group_';

const processGroupNode = (node: GridColumnNode): GridColumnNode => {
  if (isLeaf(node)) {
    return node;
  }

  const group = node;
  const newChildren: GridColumnNode[] = [];

  group.children.forEach(child => {
    const processedChild = processGroupNode(child);
    newChildren.push(processedChild);

    // Если ребенок processedChild не является группой, добавляем копию столбца с префиксом
    if (isLeaf(processedChild)) {
      newChildren.push({
        // При группировке создается новый видимый столбец со следующим служебным полем
        // __row_group_by_columns_group_COLUMN.FIELD__
        // Добавляем к каждой группе дубликат child с преобразованным field
        field: `${serviceRowGroupPrefix}${processedChild.field}__`,
      });
    }
  });

  return {
    ...group,
    children: newChildren,
  };
};

export const modifyColumnGroupingModel = (columnGroupingModel?: GridColumnGroupingModel) =>
  columnGroupingModel?.map(processGroupNode) as GridColumnGroupingModel;
