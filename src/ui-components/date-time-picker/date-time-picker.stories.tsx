import type { Meta, StoryObj } from '@storybook/react';

import { DateTimePicker } from './date-time-picker.component';

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  title: 'UI Controls/Inputs/Date & Time Picker',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    isDisabled: false,
    variant: 'outlined',
  },
};
export default meta;

type Story = StoryObj<typeof DateTimePicker>;

export const DateTime: Story = {
  args: {
    value: new Date('Mon Jan 15 2024 18:46:54 GMT+0300'),
    type: 'datetime',
  },
};

export const DatePicker: Story = {
  args: {
    value: new Date('Mon Jan 15 2024 18:46:54 GMT+0300'),
    type: 'date',
  },
};

export const TimePicker: Story = {
  args: {
    value: new Date('Mon Jan 15 2024 18:46:54 GMT+0300'),
    type: 'time',
  },
};
