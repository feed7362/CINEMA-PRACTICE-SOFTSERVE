import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProfilesDemo from '@/stories/ProfilesDemo';

const meta = {
	title: 'Stories/ProfilesDemo',
	component: ProfilesDemo,
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
} satisfies Meta<typeof ProfilesDemo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};