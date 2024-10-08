import { t, TFunction } from 'i18next';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMatches } from 'react-router-dom';

import { RouteTitleMeta } from '~/routing/routes.types';

interface TitleContextProps {
  title: string;
  setEntityTitle: (title: string) => void;
}

const defaultTitleValues: TitleContextProps = {
  title: t('PROJECT_NAME'),
  setEntityTitle: () => void 0,
};

const PageTitleContext = createContext<TitleContextProps>(defaultTitleValues);
export const useTitleContext = () => useContext(PageTitleContext);

export const TitleProvider: FC<PropsWithChildren> = ({ children }) => {
  const matches = useMatches();
  const [entityTitle, setEntityTitle] = useState('');
  const matchData = useMemo(() => matches.at(-1)?.data as RouteTitleMeta, [matches]);
  const defaultTitle = useMemo(() => {
    return matchData?.title ?? matchData?.menuDisplay?.label;
  }, [matchData]);

  const title = useMemo(() => {
    if (entityTitle) {
      if (defaultTitle) {
        const routeTitle = getTitle(defaultTitle, t);
        return `${routeTitle}: ${entityTitle} - ${t('PROJECT_NAME')}`;
      }
      return `${entityTitle} - ${t('PROJECT_NAME')}`;
    }
    if (defaultTitle) {
      const routeTitle = getTitle(defaultTitle, t);
      return `${routeTitle} - ${t('PROJECT_NAME')}`;
    }
    return t('PROJECT_NAME');
  }, [defaultTitle, entityTitle]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const providerValue = useMemo(() => ({ title, setEntityTitle }), [title]);

  return <PageTitleContext.Provider value={providerValue}>{children}</PageTitleContext.Provider>;
};

function getTitle(title: string, t: TFunction) {
  const words = title.split(' ');
  let toTitle = t(words[0]);

  words.slice(1).forEach(word => {
    toTitle += ` ${t(word).toLowerCase()}`;
  });

  return toTitle;
}
