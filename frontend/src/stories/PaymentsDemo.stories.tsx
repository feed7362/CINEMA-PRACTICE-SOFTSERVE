import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
// УВАГА: Для Stripe елементів може знадобитися обгортка Elements provider, 
// але оскільки це просто UI демо з заглушками, має працювати так.
import PaymentsDemo from './PaymentsDemo';

const meta = {
  title: 'Stories/PaymentsDemo',
  component: PaymentsDemo,
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
} satisfies Meta<typeof PaymentsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};