import { MutableRefObject, useLayoutEffect, useRef } from 'react';

const noop = () => {};

export function useResizeObserver(
  ref: MutableRefObject<HTMLElement | undefined | null>,
  fn: (entries: ResizeObserverEntry[]) => void,
  enabled: boolean = true,
): void {
  const fnRef = useRef<(entries: ResizeObserverEntry[]) => void>(noop);
  fnRef.current = fn;

  const isDevEnvironment = process.env.NODE_ENV === 'development';

  useLayoutEffect(() => {
    if (!enabled || typeof ResizeObserver === 'undefined') {
      return noop;
    }

    let frameID = 0;
    const target = ref.current;
    const observer = new ResizeObserver(entries => {
      // See https://github.com/mui/mui-x/issues/8733
      // In dev, we avoid the React warning by moving the task to the next frame.
      // In prod, we want the task to run in the same frame as to avoid tear.
      if (isDevEnvironment) {
        frameID = requestAnimationFrame(() => {
          fnRef.current(entries);
        });
      } else {
        fnRef.current(entries);
      }
    });

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (frameID) {
        cancelAnimationFrame(frameID);
      }
      observer.disconnect();
    };
  }, [ref, enabled, isDevEnvironment]);
}
