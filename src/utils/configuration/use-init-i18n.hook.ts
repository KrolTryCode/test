import { loadMessages, locale } from 'devextreme/localization';
import enMessages from 'devextreme/localization/messages/en.json';
import ruMessages from 'devextreme/localization/messages/ru.json';
import i18n, { use } from 'i18next';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { setErrorMap } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import zodEn from 'zod-i18n-map/locales/en/zod.json';
import zodRu from 'zod-i18n-map/locales/ru/zod.json';

import { useDownloadMessagesMapQuery } from '~/api/queries/locale/get-messages-map.query';

import en_US from '../../assets/dictionary/en_US.json';
import ru_RU from '../../assets/dictionary/ru_RU.json';
import { configureYup } from '../validation/configure-yup';
import yupRuLocale from '../validation/locales/ru-messages';

export const i18nConfig = {
  resources: {
    en: {
      translation: en_US,
      zod: zodEn,
    },
    ru: {
      translation: ru_RU,
      zod: zodRu,
      yup: yupRuLocale,
    },
  },
  lng: localStorage.getItem('selectedLanguage') ?? 'ru',
  fallbackLng: 'ru',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
};

export const loadLocales = () => {
  locale(i18n.language);
  loadMessages(ruMessages);
  loadMessages(enMessages);
};

export const useI18nInit = () => {
  void use(initReactI18next).init(i18nConfig);
  loadLocales();
  setErrorMap(zodI18nMap);
  configureYup(i18n.language);
};

export const useDownloadTranslations = () => {
  const { t, i18n } = useTranslation();
  const { data } = useDownloadMessagesMapQuery();

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
    if (data) {
      i18n.addResourceBundle(i18n.language, 'translation', data, true, true);
    }
  }, [data, i18n, t]);

  return use(initReactI18next);
};
