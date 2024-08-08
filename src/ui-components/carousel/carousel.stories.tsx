import type { Meta, StoryObj } from '@storybook/react';

import { Carousel, CarouselWrapper } from './carousel.component';

const images = [
  {
    id: '1',
    alt: '1',
    src: 'https://placehold.co/600x400/0054a5/FFFFFF',
  },
  {
    id: '2',
    alt: '2',
    src: 'https://placehold.co/400x400/030303/FFFFFF',
  },
  {
    id: '3',
    alt: '3',
    src: 'https://placehold.co/400x600/ea0b0b/FFFFFF',
  },
  {
    id: '4',
    alt: '4',
    src: 'https://placehold.co/550x300/ea770b/FFFFFF',
  },
  {
    id: '5',
    alt: '5',
    src: 'https://placehold.co/550x400/2cb563/FFFFFF',
  },
  {
    id: '6',
    alt: '6',
    src: 'https://placehold.co/550x500/333333/FFFFFF',
  },
];

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'UI Controls/Carousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    hasFullscreenButton: true,
    isSwipeable: true,
    images,
  },
};
export default meta;

type Story = StoryObj<typeof Carousel>;

/**
 * Чтобы зафиксировать размер карусели, ее необходимо обернуть. В обертке указать размер.
 */
export const WrappedCarousel: Story = {
  name: 'Wrapped (Fixed-size) Carousel',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ width: '400px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
export const WrappedCarouselDefault: Story = {
  name: 'Carousel with default wrapper',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <CarouselWrapper>
        <Story />
      </CarouselWrapper>
    ),
  ],
};
export const DefaultCarousel: Story = {};
export const OneImage: Story = { args: { images: images.slice(0, 1) } };
