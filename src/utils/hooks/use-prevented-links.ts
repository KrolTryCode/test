import { notifyInfo } from '@pspod/ui-components';
import { MutableRefObject, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function usePreventedLinks(container?: MutableRefObject<HTMLElement | undefined>) {
  const { t } = useTranslation();
  const containerElement = useMemo(() => container?.current ?? document.body, [container]);

  useEffect(() => {
    function hrefClickListener(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (target.tagName === 'A') {
        e.preventDefault();
        notifyInfo(t('MESSAGE.NAVIGATION_PREVENTED'));
      }
    }

    containerElement.addEventListener('click', hrefClickListener);
    return () => containerElement.removeEventListener('click', hrefClickListener);
  }, [containerElement, t]);
}
