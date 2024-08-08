import AddReactionIcon from '@mui/icons-material/AddReaction';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.component';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI Controls/Buttons',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Кнопка',
    color: 'secondary',
    size: 'medium',
    variant: 'outlined',
    isLoading: false,
    disabled: false,
    fullWidth: false,
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = { name: 'Default (Secondary) Button' };
export const ContainedButton: Story = { args: { variant: 'contained' } };
export const PrimaryButton: Story = { args: { color: 'primary' } };
export const PrimaryContainedButton: Story = { args: { color: 'primary', variant: 'contained' } };
export const FullWidthButton: Story = { args: { fullWidth: true } };
export const LoadingButton: Story = { args: { isLoading: true } };
export const LoadingPrimaryContainedButton: Story = {
  args: { isLoading: true, variant: 'contained', color: 'primary' },
};
export const SmallButton: Story = { args: { size: 'small' } };
export const MediumButton: Story = { args: { size: 'medium' } };
export const LargeButton: Story = { args: { size: 'large' } };
export const ButtonWithIcon: Story = { args: { icon: <AddReactionIcon /> } };
export const WarningButton: Story = { args: { color: 'warning' } };
export const ErrorButton: Story = { args: { color: 'error' } };
export const SuccessButton: Story = { args: { color: 'success' } };
