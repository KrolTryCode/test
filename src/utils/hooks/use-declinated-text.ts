import { Case, Gender } from 'russian-nouns-js';

import { useNounDeclination } from '~/utils/hooks/use-noun-declination';

export const useDeclinatedText = () => {
  const useDeclination = (text: string) =>
    useNounDeclination({
      text,
      gender: Gender.FEMININE,
      morphologicalCase: Case.ACCUSATIVE,
    });

  const declinatedGroupText = useDeclination('ENTITY.GROUP');
  const declinatedTableText = useDeclination('ENTITY.TABLE');
  const declinatedDirectoryText = useDeclination('ENTITY.DIRECTORY');
  const declinatedStructureText = useDeclination('ENTITY.STRUCTURE');

  return {
    declinatedGroupText,
    declinatedTableText,
    declinatedDirectoryText,
    declinatedStructureText,
  };
};
