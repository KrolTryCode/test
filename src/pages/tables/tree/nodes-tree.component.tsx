import { FC } from 'react';

import { NavTreeItem } from '~/components/nav-tree/nav-tree-item.component';
import { NavTree } from '~/components/nav-tree/nav-tree.component';
import { useNavTreeActions } from '~/pages/tables/tree/use-nav-tree-actions.hook';
import { useTablesMenuData } from '~/pages/tables/tree/use-tables-menu-data.hook';
import { tablesPath } from '~/utils/configuration/routes-paths';

export const NodesTree: FC = () => {
  const { treeData, isLoading } = useTablesMenuData();
  const { menuItems } = useNavTreeActions();

  return (
    <NavTree
      data={treeData}
      baseUrl={tablesPath}
      isLoading={isLoading}
      slots={{ item: NavTreeItem }}
      menuItems={menuItems}
    />
  );
};
