import { screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { mockGetTemplates } from 'tests/__mocks__/api-client.mock';
import { renderComponent } from 'tests/utils/render-component';
import { TemplatesPage } from '~/pages/_main/admin/templates.index';

describe.skip('Templates page', () => {
  beforeAll(() => {
    renderComponent(<TemplatesPage />, { route: '/' });
  });

  it('renders the templates', async () => {
    const dataGrid = await screen.findByRole('grid');
    const columns = await screen.findAllByRole('columnheader');
    expect(dataGrid).toBeInTheDocument();
    expect(columns).toHaveLength(4);
    expect(mockGetTemplates).toHaveBeenCalledTimes(1);

    expect(dataGrid).toMatchSnapshot();
  });
});
