import type { Meta, StoryObj } from '@storybook/react';

import { Select as SelectComponent } from './select.component';

const meta: Meta<typeof SelectComponent> = {
  component: SelectComponent,
  title: 'UI Controls/Inputs/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    isDisabled: false,
    isMultiple: false,
    isReadonly: false,
    fullWidth: false,
    size: 'medium',
    items: [
      { id: 1, label: 'Variant 1' },
      { id: 2, label: 'Variant 2' },
      { id: 3, label: 'Variant 3' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof SelectComponent>;

export const DefaultSelect: Story = {
  args: {
    valueExpr: 'id',
    displayExpr: 'label',
  },
};

export const Multiselect: Story = {
  args: {
    valueExpr: 'id',
    displayExpr: 'label',
    isMultiple: true,
  },
};

export const EmptySelect: Story = {
  args: {
    items: [],
  },
};
