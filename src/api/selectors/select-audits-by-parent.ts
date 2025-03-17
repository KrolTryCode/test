import { PageFullAuditInfo } from '~/api/utils/api-requests';

export const selectAuditsByParentNode = (data: PageFullAuditInfo, parentNodeId?: string) => {
  return data.content?.filter(el => el.parent?.objectId === parentNodeId);
};
