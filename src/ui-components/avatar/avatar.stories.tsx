import AssignmentIcon from '@mui/icons-material/Assessment';
import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar.component';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'UI Controls/Avatar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'medium',
    // children: 'Кнопка',
    // color: 'secondary',
    // variant: 'outlined',
    // isLoading: false,
    // disabled: false,
    // fullWidth: false,
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const DefaultAvatar: Story = {};

export const SmallText: Story = { args: { children: 'JD', size: 'small' } };
export const MediumText: Story = { args: { children: 'JD' } };
export const LargeText: Story = { args: { children: 'JD', size: 'large' } };

export const SmallWithIcon: Story = { args: { withIcon: true, size: 'small' } };
export const MediumWithIcon: Story = { args: { withIcon: true } };
export const LargeWithIcon: Story = { args: { withIcon: true, size: 'large' } };

export const CustomIcon: Story = { args: { withIcon: true, children: <AssignmentIcon /> } };

export const ColorSecondaryText: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { children: 'JD', color: 'secondary' },
};
export const ColorSecondaryIcon: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { withIcon: true, color: 'secondary' },
};
