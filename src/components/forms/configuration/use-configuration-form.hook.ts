import { notifySuccess } from '@pspod/ui-components';
import { useTranslation } from 'react-i18next';

import { useGetConfigurationQuery } from '~/api/queries/settings/get-module-configuration.query';
import { Configuration } from '~/api/queries/settings/queries';
import { useSaveConfigurationMutation } from '~/api/queries/settings/save-module-configuration.mutation';
import { EntityModelModuleConfiguration } from '~/api/utils/api-requests';
import { showErrorMessage } from '~/utils/show-error-message';

export const useConfigurationForm = (moduleDescription: EntityModelModuleConfiguration) => {
  const { t } = useTranslation();

  const fetchLink = moduleDescription._links?.GET?.href;
  const saveLink = moduleDescription._links?.POST?.href;

  const { data: values, isLoading } = useGetConfigurationQuery(
    moduleDescription.moduleName ?? '',
    fetchLink!,
    { enabled: !!fetchLink },
  );

  const { mutateAsync: save, isPending } = useSaveConfigurationMutation(
    moduleDescription.moduleName ?? '',
    saveLink ?? '',
  );

  const onSubmit = async (formValues: Configuration) => {
    await save(formValues, {
      onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
      onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
    });
  };

  return { values, isPending, isLoading, onSubmit };
};
