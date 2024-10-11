import { Preloader } from '@pspod/ui-components';

import { useGetModulesListQuery } from '~/api/queries/settings/get-modules-list.query';
import { ConfigurationFormComponent } from '~/components/configuration-form/configuration-form.component';

const SettingsPage = () => {
  const { data: modulesList, isLoading } = useGetModulesListQuery();

  return (
    <>
      {modulesList?._embedded?.moduleConfigurationList?.map(entry => (
        <ConfigurationFormComponent {...entry} key={entry.moduleName} />
      ))}
      {isLoading && <Preloader />}
    </>
  );
};

export default SettingsPage;
