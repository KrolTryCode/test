import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createLemma, Engine } from 'russian-nouns-js';
import type { Case } from 'russian-nouns-js/src/Case';
import type { Gender } from 'russian-nouns-js/src/Gender';

interface UseNounDeclinationParams {
  text: string;
  gender: Gender;
  morphologicalCase: Case;
}

export function useNounDeclination({
  text,
  morphologicalCase,
  gender,
}: UseNounDeclinationParams): string {
  const { t } = useTranslation();

  const engine = useMemo(() => new Engine(), []);

  return engine.decline(
    createLemma({
      text: t(text),
      gender: gender as unknown as string,
    }),
    morphologicalCase as unknown as string,
  )[0];
}
