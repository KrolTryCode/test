import { LocaleObject, defaultLocale, Message } from 'yup';

const i18nKey = 'yup';
type LocaleType = keyof LocaleObject;
const defaultRuLocale = Object.entries(defaultLocale).reduce<LocaleObject>((all, current) => {
  const [type, locales] = current as [LocaleType, LocaleObject[LocaleType]];
  const messages = Object.entries(locales ?? {}).reduce<typeof locales>((all, current) => {
    const msg: Message<Record<string, unknown>> = values => ({
      key: `${i18nKey}:${type}.${current[0]}`,
      values,
    });
    return { ...all, [current[0]]: msg };
  }, {});

  return { ...all, [type]: messages };
}, {});

const dateKey = 'date';
export const date: LocaleObject[typeof dateKey] = {
  min: ({ min }) => ({
    key: `yup:${dateKey}.min`,
    values: { min: new Date(min).toLocaleDateString('ru') },
  }),
  max: ({ max }) => ({
    key: `yup:${dateKey}.max`,
    values: { max: new Date(max).toLocaleDateString('ru') },
  }),
};

export const ruLocale: LocaleObject = {
  ...defaultRuLocale,
  date,
};
