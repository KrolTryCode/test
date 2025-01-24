import { useMatches } from '@tanstack/react-router';
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
  const defaultTitle = useMemo(() => {
    const route = matches.at(-1);
    const title = /* matchData?.title */ '';
    return title ?? route?.staticData?.title;
  }, [matches]);

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
