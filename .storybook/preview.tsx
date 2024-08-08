import type { Preview } from '@storybook/react';
import React, { Suspense, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n, { use } from 'i18next';

import 'devexpress-gantt/dist/dx-gantt.css';
import '../src/themes/generated/theme.base.css';
import '../src/themes/generated/theme.additional.css';
import { i18nConfig, loadLocales } from '../src/utils/configuration/use-init-i18n.hook';
import { MuiThemeProvider } from '../src/themes/mui-theme-provider';

const withI18next = (Story, context) => {
  const { locale } = context.globals;
  void use(initReactI18next).init(i18nConfig);

  useEffect(() => {
    loadLocales();
    void i18n.changeLanguage(locale);
  }, [locale]);

  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <MuiThemeProvider>
        <I18nextProvider i18n={i18n}>{Story()}</I18nextProvider>
      </MuiThemeProvider>
    </Suspense>
  );
};

const decorators = [withI18next];

const preview: Preview = {
  decorators,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  globals: {
    locale: 'ru',
    locales: {
      en: 'English',
      ru: 'Русский',
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ru', title: 'Русский' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
