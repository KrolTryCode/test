import type { Meta, StoryObj } from '@storybook/react';

import { InputText } from './input-text.component';

const meta: Meta<typeof InputText> = {
  component: InputText,
  title: 'UI Controls/Inputs/Text',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    value: 'Text',
    type: 'text',
    isDisabled: false,
    isMultiline: false,
    isReadonly: false,
    invalid: false,
    fullWidth: true,
    placeholder: '',
    variant: 'outlined',
  },
};
export default meta;

type Story = StoryObj<typeof InputText>;

/**
 * Input для ввода однострочных текстовых данных
 */
export const Text: Story = {};

export const FilledInput: Story = {
  args: {
    variant: 'filled',
  },
};

/**
 * Input для ввода пароля
 */
export const Password: Story = {
  args: {
    value: 'Password',
    type: 'password',
  },
};

/**
 * Input с незаданным значением, отображается placeholder
 */
export const EmptyInput: Story = {
  args: {
    value: '',
    placeholder: 'Введите текст...',
  },
};
