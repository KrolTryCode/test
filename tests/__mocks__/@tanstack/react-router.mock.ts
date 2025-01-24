export const mockedNavigate = vi.fn();
export const mockedParams = vi.fn();
export const mockedLocation = vi.fn(() => window.location);

export const mockedMatches = vi.fn(() => {
  const isAdminPath = location.pathname.startsWith('/admin');
  return isAdminPath
    ? [
        {
          staticData: {
            accessBy: ['admin'],
          },
        },
      ]
    : [];
});
