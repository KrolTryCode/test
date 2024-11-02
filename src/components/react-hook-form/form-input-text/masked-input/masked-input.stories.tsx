// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { MaskedInput } from './masked-input.component';

const onChange = (value: string) => {
  action('onChange')(value);
};

const meta: Meta<typeof MaskedInput> = {
  component: MaskedInput,
  title: 'UI Controls/Inputs/Masked',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    mask: '+7 (000) 000-00-00',
    isDisabled: false,
    isMultiline: false,
    isReadonly: false,
    invalid: false,
    fullWidth: true,
    placeholder: '',
    variant: 'outlined',
    onChange,
  },
};
export default meta;

type Story = StoryObj<typeof MaskedInput>;

export const PhoneMask: Story = {};
