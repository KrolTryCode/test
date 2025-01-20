import { useGetProjectContentQuery } from '~/api/queries/project-content/get-project-content.query';
import { useGetTableMetadataColumns } from '~/api/queries/tables/structure/get-table-metadata.query';
import { selectNodeColumns } from '~/api/selectors/select-node-columns';

export const useTableStructureData = (nodeId: string) => {
  const { data: nodeInfo, isLoading: isNodeLoading } = useGetProjectContentQuery(nodeId);
  const {
    data: nodeColumns,
    isLoading: isColumnsLoading,
    isFetched: isColumnsFetched,
  } = useGetTableMetadataColumns(nodeId, {
    select: selectNodeColumns,
  });

  return {
    nodeInfo,
    nodeColumns,
    isDataLoading: isColumnsLoading || isNodeLoading,
    isColumnsFetched,
  };
};
