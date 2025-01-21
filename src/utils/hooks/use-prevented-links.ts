import { notifyInfo } from '@pspod/ui-components';
import { MutableRefObject, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function usePreventedLinks(container?: MutableRefObject<HTMLElement | undefined>) {
  const { t } = useTranslation();

  useEffect(() => {
    const containerElement = container?.current ?? document.body;
    function hrefClickListener(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (target.tagName === 'A') {
        e.preventDefault();
        notifyInfo(t('MESSAGE.NAVIGATION_PREVENTED'));
      }
    }

    containerElement.addEventListener('click', hrefClickListener);
    return () => containerElement.removeEventListener('click', hrefClickListener);
  }, [container, t]);
}
