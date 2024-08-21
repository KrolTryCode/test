import { FC } from 'react';

import { NavTree } from '~/components/nav-tree/nav-tree.component';
import { useDropdownMenuItems } from '~/pages/tables/tree/use-dropdown-menu-items.hook';
import { useTablesMenuData } from '~/pages/tables/use-tables-menu-data.hook';
import { tablesPath } from '~/utils/configuration/routes-paths';

export const NodesTree: FC = () => {
  const { treeData, isLoading } = useTablesMenuData();
  const { menuItems } = useDropdownMenuItems(treeData);

  return (
    <NavTree data={treeData} baseUrl={tablesPath} isLoading={isLoading} menuItems={menuItems} />
  );
};
