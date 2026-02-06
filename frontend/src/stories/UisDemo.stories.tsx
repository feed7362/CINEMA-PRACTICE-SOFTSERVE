import type { Meta, StoryObj } from '@storybook/react';
import UisDemo from '@/stories/UisDemo';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Stories/UisDemo', 
  component: UisDemo,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="bg-[#020617] min-h-screen p-10 text-white">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof UisDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Просто рендеримо сторінку як є
export const Default: Story = {};