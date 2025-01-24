import { FC } from 'react';

import { NavTree } from '~/components/nav-tree/nav-tree.component';
import { useTablesMenuData } from '~/pages/_main/projects/_components/use-tables-menu-data.hook';
import { tablesPath } from '~/utils/configuration/routes-paths';

import { useDropdownMenuItems } from './use-dropdown-menu-items.hook';

export const NodesTree: FC = () => {
  const { treeData, isLoading } = useTablesMenuData();
  const { menuItems } = useDropdownMenuItems(treeData);

  return (
    <NavTree data={treeData} baseUrl={tablesPath} isLoading={isLoading} menuItems={menuItems} />
  );
};
