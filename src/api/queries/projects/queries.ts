import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const projectQueries = createQueryKeys('project', {
  single: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getProjectNodeById(projectId),
  }),
  byParent: (parentNodeId?: string) => ({
    queryKey: [parentNodeId],
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getChildrenByParent({ parentNodeId }),
  }),
  tree: {
    queryKey: null,
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getNodesTree(),
  },
  parents: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () =>
      ApiClientSecured.projectNodeV1Controller.getParentsByChild({ childNodeId: projectId }),
  }),
  tasks: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectTasksV1Controller.getProjectTasks(projectId),
  }),
  task: (taskId: string) => ({
    queryKey: [taskId],
    queryFn: () => ApiClientSecured.tasksV1Controller.getTask(taskId),
  }),
  logo: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectFilesV1Controller.getProjectLogo(projectId),
  }),
  permissionTypes: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getAvailablePermissionTypes(projectId),
  }),
  exportProject: (projectId: string, types: string[]) => ({
    queryKey: [projectId, { types }],
    queryFn: () =>
      ApiClientSecured.projectNodeV1Controller.exportProject(
        projectId,
        { types },
        { format: 'blob' },
      ),
  }),
});
