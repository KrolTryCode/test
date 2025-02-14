import { ModuleType } from '~/api/queries/settings/get-module-list.query';
import {
  CollectionModelEntityModelModuleConfiguration,
  EntityModelModuleConfiguration,
} from '~/api/utils/api-requests';

export const selectPropertiesByModuleName = (
  data: CollectionModelEntityModelModuleConfiguration,
  moduleName: ModuleType,
): EntityModelModuleConfiguration[] | undefined => {
  return data._embedded?.moduleConfigurationList?.filter(el => el.moduleName === moduleName);
};
