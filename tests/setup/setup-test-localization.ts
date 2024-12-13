import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nConfig } from '~/utils/configuration/translations/use-init-i18n.hook';
import { configureYup } from '~/utils/validation/configure-yup';

export const setupTestLocalization = async () => {
  // not a hook
  // eslint-disable-next-line react-hooks/rules-of-hooks
  await use(initReactI18next).init({
    ...i18nConfig,
    lng: 'ru',
    fallbackLng: 'ru',
  });

  configureYup('ru');
};
