import { screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { mockedParams } from 'tests/__mocks__/react-router-dom.mock';
import { renderComponent } from 'tests/utils/render-component';
import Profile from '~/pages/profile/profile.page';

describe('Profile', () => {
  beforeAll(() => {
    mockedParams.mockReturnValue({ userId: 'test-admin-id-2c963f66afa6' });
    renderComponent(<Profile />, { withRouter: true });
  });

  it('renders the profile', () => {
    const container = screen.getByTestId('appContainer');
    expect(container).toMatchSnapshot('profile');
  });
});
