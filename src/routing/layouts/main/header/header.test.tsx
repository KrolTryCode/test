import { screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { renderComponent } from 'tests/utils/render-component';

import { Header } from './header.component';

describe('Header', () => {
  beforeEach(() => {
    renderComponent(<Header />, { withRouter: true });
  });

  // TODO mock redux userAuthorities
  it.skip('renders the header correctly', async () => {
    expect(await screen.findByRole('link', { name: '?' })).toBeInTheDocument();
    const container = await screen.findByTestId('appContainer');
    expect(container).toMatchSnapshot();
  });
});
