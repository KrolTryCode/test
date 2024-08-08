import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from '@mui/material/MenuItem';
import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from './dropdown-menu.component';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'UI Controls/Dropdown Menu',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    buttonSize: 'small',
    buttonColor: 'secondary',
    buttonVariant: 'text',
    buttonContent: <MoreHorizIcon />,
    children: [
      <MenuItem key={'1'}>Item 1</MenuItem>,
      <MenuItem key={'2'} divider>
        Item 2
      </MenuItem>,
      <MenuItem key={'3'} component={'a'} href={'#'}>
        Link Item
      </MenuItem>,
    ],
  },
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Dropdown: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { showArrow: false },
};

export const DropdownTextContent: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { showArrow: true, buttonContent: 'Меню', buttonSize: 'medium' },
};

export const DropdownSmallPrimaryText: Story = {
  args: {
    showArrow: false,
    buttonSize: 'medium',
    buttonColor: 'primary',
    buttonVariant: 'text',
  },
};

export const DropdownMeduimPrimaryOutlined: Story = {
  args: {
    showArrow: false,
    buttonSize: 'medium',
    buttonColor: 'primary',
    buttonVariant: 'outlined',
  },
};

export const DropdownLargePrimaryContained: Story = {
  args: {
    showArrow: false,
    buttonSize: 'large',
    buttonColor: 'primary',
    buttonVariant: 'contained',
  },
};
