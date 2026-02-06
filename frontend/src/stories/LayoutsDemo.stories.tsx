import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LayoutsDemo from './LayoutsDemo';

const meta = {
  title: 'Stories/LayoutsDemo',
  component: LayoutsDemo,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="bg-[#020617] min-h-screen p-8 text-white font-['Inter']">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LayoutsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};