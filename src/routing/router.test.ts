import { router } from './router';

const { routeTree } = router;

describe('TS Router', () => {
  describe('Root', () => {
    const rootChilren = routeTree.children;

    test('Root router should have 2 pathless (layout) routes _auth and _main', () => {
      expect(routeTree.isRoot).toBeTruthy();
      expect(rootChilren).toBeDefined();
      expect(Object.values(rootChilren!).length).toBe(2);
    });

    test('rootChilren?.[0] toBeDefined', () => {
      // @ts-expect-error type error
      expect(rootChilren?.[0]).toBeDefined();
      // @ts-expect-error type error
      expect(rootChilren?.[0]?.id).toBe('/_auth');
    });

    test('rootChilren?.[1] toBeDefined', () => {
      // @ts-expect-error type error
      expect(rootChilren?.[1]).toBeDefined();
      // @ts-expect-error type error
      expect(rootChilren?.[1]?.id).toBe('/_main');
    });

    test('rootChilren?.AuthRoute not toBeDefined...', () => {
      expect(rootChilren?.AuthRoute).not.toBeDefined();
      expect(rootChilren?.MainRoute).not.toBeDefined();
    });
  });
});
