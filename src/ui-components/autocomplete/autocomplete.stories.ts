import type { Meta, StoryObj } from '@storybook/react';

import { Autocomplete as AutocompleteComponent } from './autocomplete.component';
import { AutocompleteProps } from './autocomplete.type';

const meta: Meta<AutocompleteProps<Record<string, string>>> = {
  component: AutocompleteComponent,
  title: 'UI Controls/Inputs/Autocomplete',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    isReadonly: false,
    fullWidth: false,
    valueExpr: 'id',
    displayExpr: 'label',
    size: 'medium',
    variant: 'outlined',
    label: '',
    placeholder: '',
    items: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ],
  },
};
export default meta;

type Story = StoryObj<Record<string, string>>;

export const Autocomplete: Story = {};
