import { Preloader } from '@pspod/ui-components';

import { ModuleType, useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { selectPropertiesByModuleName } from '~/api/selectors/select-properties-by-module-name';
import { DefaultConfigurationForm } from '~/components/configuration-form/default-configuration-form.component';

const SecurityPage = () => {
  const { data: moduleProperties, isLoading } = useGetModulesListQuery({
    select: data => selectPropertiesByModuleName(data, ModuleType.ACCOUNTS),
  });

  return (
    <>
      {moduleProperties?.map(entry => (
        <DefaultConfigurationForm {...entry} key={entry.moduleName} />
      ))}
      <Preloader visible={isLoading} />
    </>
  );
};

export default SecurityPage;
