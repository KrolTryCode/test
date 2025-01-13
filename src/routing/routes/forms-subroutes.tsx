import { RouteDescription } from '~/routing/routes.types';
import { addPath, editPath } from '~/utils/configuration/routes-paths';

export const formSubroutes: RouteDescription[] = [
  {
    isIndex: true,
    title: 'NAVIGATION.FORMS',
    lazyElement: () => import('~/pages/projects/project/tasks/forms/task-forms.page'),
  },
  {
    path: addPath,
    title: 'ACTION.ADD ENTITY.FORM',
    lazyElement: () => import('~/pages/projects/project/tasks/forms/add-task-form.page'),
  },
  {
    path: `:formId/${editPath}`,
    title: 'ACTION.EDIT ENTITY.FORM',
    lazyElement: () => import('~/pages/projects/project/tasks/forms/edit-task-form.page'),
  },
];
