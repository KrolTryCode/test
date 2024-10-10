import { adminPath } from '~/utils/configuration/routes-paths';

export const mockedNavigate = vi.fn();
export const mockedParams = vi.fn();

export const mockedMatches = vi.fn(() => {
  const isAdminPath = location.pathname.startsWith(`/${adminPath}`);
  return isAdminPath
    ? [
        {
          data: {
            accessBy: ['admin'],
          },
        },
      ]
    : [];
});
