import { screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { mockedParams } from 'tests/__mocks__/@tanstack/react-router.mock';
import { renderComponent } from 'tests/utils/render-component';
import { Profile } from '~/pages/_main/profile';

describe('Profile', () => {
  beforeAll(() => {
    mockedParams.mockReturnValue({ userId: 'test-admin-id-2c963f66afa6' });
    renderComponent(<Profile />, { route: '/' });
  });

  it('renders the profile', () => {
    const container = screen.getByTestId('appContainer');
    expect(container).toMatchSnapshot('profile');
  });
});
