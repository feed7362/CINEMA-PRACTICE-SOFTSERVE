import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SchedulesDemo from '@/stories/SchedulesDemo';

const meta = {
  title: 'Stories/SchedulesDemo',
  component: SchedulesDemo,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-[#020617] min-h-screen p-8 text-white font-['Inter']">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SchedulesDemo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};