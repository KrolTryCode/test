import React, { ReactNode, createContext, FC, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Case, Engine, Gender } from 'russian-nouns-js';
import type { Gender as GenderType } from 'russian-nouns-js/src/Gender';
import type { LemmaOptions } from 'russian-nouns-js/src/Lemma';

type DeclinationMap = Record<keyof typeof Case, string>;

const DeclinatedTranslationsContext = createContext<
  ReturnType<typeof createDeclinatedTranslations> | undefined
>(undefined);

export const useDeclinatedTranslationsContext = () => {
  const context = useContext(DeclinatedTranslationsContext);
  if (!context) {
    throw new Error('Не определен контекст для склоненных переводов');
  }
  return context;
};

export const createDeclinatedTranslations = (
  engine: Engine,
  t: (key: string) => string,
  language: string,
) => {
  const createRuDeclinations = (
    key: string,
    gender: GenderType,
    lemmaOptions: Omit<LemmaOptions, 'text' | 'gender'>,
  ) => {
    return Object.keys(Case).reduce((acc, caseKey) => {
      const morphCase = Case[caseKey as keyof typeof Case];
      acc[caseKey as keyof typeof Case] = engine.decline(
        { text: t(key), gender, ...lemmaOptions },
        morphCase,
      )[0];
      return acc;
    }, {} as DeclinationMap);
  };

  const createDefaultDeclinationMap = (key: string) => {
    return Object.keys(Case).reduce((acc, caseKey) => {
      acc[caseKey as keyof typeof Case] = t(key);
      return acc;
    }, {} as DeclinationMap);
  };

  const getDeclinationsMap = (
    entity: string,
    gender: GenderType,
    lemmaOptions: Omit<LemmaOptions, 'text' | 'gender'> = {},
  ) => {
    if (language === 'ru') {
      return createRuDeclinations(entity, gender, lemmaOptions);
    } else {
      return createDefaultDeclinationMap(entity);
    }
  };

  return {
    GROUP: getDeclinationsMap('ENTITY.GROUP', Gender.FEMININE),
    TABLE: getDeclinationsMap('ENTITY.TABLE', Gender.FEMININE),
    PROJECT: getDeclinationsMap('ENTITY.PROJECT', Gender.MASCULINE),
    DIRECTORY: getDeclinationsMap('ENTITY.DIRECTORY', Gender.FEMININE),
    STRUCTURE: getDeclinationsMap('ENTITY.STRUCTURE', Gender.FEMININE),
    PARTICIPANT: getDeclinationsMap('ENTITY.PARTICIPANT', Gender.MASCULINE, { animate: true }),
    FORM: getDeclinationsMap('ENTITY.FORM', Gender.FEMININE),
    LINK: getDeclinationsMap('ENTITY.LINK', Gender.FEMININE),
  };
};

export const DeclinatedTranslationsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const declinatedTranslations = useMemo(() => {
    const engine = new Engine();
    return createDeclinatedTranslations(engine, t, i18n.language);
  }, [t, i18n.language]);

  return (
    <DeclinatedTranslationsContext.Provider value={declinatedTranslations}>
      {children}
    </DeclinatedTranslationsContext.Provider>
  );
};
