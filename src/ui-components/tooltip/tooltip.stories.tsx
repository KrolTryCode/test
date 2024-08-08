import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './tooltip.component';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'UI Controls/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    placement: 'bottom',
    variant: 'light',
    hasArrow: false,
    hasElevation: false,
    hasOffset: true,
    children: (
      <span>
        Tooltip
        <br />
        <br />
      </span>
    ),
    content: 'Tooltip content',
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const DarkTooltip: Story = { args: { variant: 'dark' } };
export const LightTooltip: Story = { parameters: { backgrounds: { default: 'dark' } } };
