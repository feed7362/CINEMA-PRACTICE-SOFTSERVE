import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import FiltersDemo from './FiltersDemo';

const meta = {
	title: 'Stories/FiltersDemo',
	component: FiltersDemo,
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
} satisfies Meta<typeof FiltersDemo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};