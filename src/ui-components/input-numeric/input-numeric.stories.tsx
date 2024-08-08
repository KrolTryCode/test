import type { Meta, StoryObj } from '@storybook/react';

import { InputNumeric } from './input-numeric.component';

const meta: Meta<typeof InputNumeric> = {
  component: InputNumeric,
  title: 'UI Controls/Inputs/Numeric',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof InputNumeric>;

export const Number: Story = {
  args: {
    value: '0',
    isDisabled: false,
    variant: 'outlined',
  },
};

export const RangeNumber: Story = {
  args: {
    value: '0.5',
    min: 0,
    max: 1,
    step: 0.01,
    isDisabled: false,
    variant: 'outlined',
  },
};
