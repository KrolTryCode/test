import { act, screen } from '@testing-library/react';
import { t } from 'i18next';
import { it, describe, expect } from 'vitest';

import { renderComponent } from 'tests/utils/render-component';
import { useUserStore } from '~/app/user/user.store';

import { Header } from './header.component';

describe.skip('Header', () => {
  beforeEach(() => {
    useUserStore.setState({
      data: {
        permissions: ['ADMIN'],
      },
    });

    renderComponent(<Header />, { withRouter: true, route: '/projects' });
  });

  it('renders the header correctly', async () => {
    expect(await screen.findByRole('link', { name: '?' })).toBeInTheDocument();

    const container = await screen.findByTestId('appContainer');
    expect(container).toMatchSnapshot();
  });

  it('renders the header with admin permissions correctly', async () => {
    expect(await screen.findByRole('link', { name: '?' })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: t('NAVIGATION.ADMIN') })).toBeInTheDocument();
  });

  it('renders the header with user permissions correctly', async () => {
    act(() => {
      useUserStore.setState({
        data: {
          permissions: ['USER'],
        },
      });
    });

    expect(await screen.findByRole('link', { name: '?' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: t('NAVIGATION.ADMIN') })).not.toBeInTheDocument();
  });
});
