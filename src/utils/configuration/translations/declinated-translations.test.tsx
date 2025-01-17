import { beforeAll, describe, expect, it } from 'vitest';

import { renderComponent } from 'tests/utils/render-component';
import {
  createDeclinatedTranslations,
  useDeclinatedTranslationsContext,
} from '~/utils/configuration/translations/declinated-translations-provider';

describe('Declination provider test', () => {
  let declinatedTranslations: ReturnType<typeof createDeclinatedTranslations>;
  const TestComponent = () => {
    declinatedTranslations = useDeclinatedTranslationsContext();
    return <></>;
  };

  beforeAll(() => {
    renderComponent(<TestComponent />);
  });

  it('should translate words to russian with correct declinations', () => {
    // Participant https://gramota.ru/meta/uchastnik
    expect(declinatedTranslations.PARTICIPANT.NOMINATIVE).toBe('Участник');
    expect(declinatedTranslations.PARTICIPANT.GENITIVE).toBe('Участника');
    expect(declinatedTranslations.PARTICIPANT.DATIVE).toBe('Участнику');
    expect(declinatedTranslations.PARTICIPANT.ACCUSATIVE).toBe('Участника');
    expect(declinatedTranslations.PARTICIPANT.INSTRUMENTAL).toBe('Участником');
    expect(declinatedTranslations.PARTICIPANT.PREPOSITIONAL).toBe('Участнике');
    expect(declinatedTranslations.PARTICIPANT.LOCATIVE).toBe('Участнике');

    // Table
    expect(declinatedTranslations.TABLE.NOMINATIVE).toBe('Таблица');
    expect(declinatedTranslations.TABLE.GENITIVE).toBe('Таблицы');
    expect(declinatedTranslations.TABLE.DATIVE).toBe('Таблице');
    expect(declinatedTranslations.TABLE.ACCUSATIVE).toBe('Таблицу');
    expect(declinatedTranslations.TABLE.INSTRUMENTAL).toBe('Таблицей');
    expect(declinatedTranslations.TABLE.PREPOSITIONAL).toBe('Таблице');
    expect(declinatedTranslations.TABLE.LOCATIVE).toBe('Таблице');

    // Directory
    expect(declinatedTranslations.DIRECTORY.NOMINATIVE).toBe('Директория');
    expect(declinatedTranslations.DIRECTORY.GENITIVE).toBe('Директории');
    expect(declinatedTranslations.DIRECTORY.DATIVE).toBe('Директории');
    expect(declinatedTranslations.DIRECTORY.ACCUSATIVE).toBe('Директорию');
    expect(declinatedTranslations.DIRECTORY.INSTRUMENTAL).toBe('Директорией');
    expect(declinatedTranslations.DIRECTORY.PREPOSITIONAL).toBe('Директории');
    expect(declinatedTranslations.DIRECTORY.LOCATIVE).toBe('Директории');

    // Project
    expect(declinatedTranslations.PROJECT.NOMINATIVE).toBe('Проект');
    expect(declinatedTranslations.PROJECT.GENITIVE).toBe('Проекта');
    expect(declinatedTranslations.PROJECT.DATIVE).toBe('Проекту');
    expect(declinatedTranslations.PROJECT.ACCUSATIVE).toBe('Проект');
    expect(declinatedTranslations.PROJECT.INSTRUMENTAL).toBe('Проектом');
    expect(declinatedTranslations.PROJECT.PREPOSITIONAL).toBe('Проекте');
    expect(declinatedTranslations.PROJECT.LOCATIVE).toBe('Проекте');
  });
});
