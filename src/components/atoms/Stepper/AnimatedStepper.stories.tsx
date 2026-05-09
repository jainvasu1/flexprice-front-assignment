import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AnimatedStepper from './AnimatedStepper';
import Button from '../Button/Button';

const meta = {
	title: 'Atoms/AnimatedStepper',
	component: AnimatedStepper,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
	argTypes: {
		activeStep: { control: { type: 'number', min: 0 } },
	},
} satisfies Meta<typeof AnimatedStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const planSteps = [
	{ label: 'Basic info', hint: 'Name & description' },
	{ label: 'Pricing', hint: 'Tiers & rates' },
	{ label: 'Entitlements', hint: 'Features' },
	{ label: 'Review', hint: 'Confirm' },
];

export const Default: Story = {
	args: { steps: planSteps, activeStep: 0 },
};

export const InProgress: Story = {
	args: { steps: planSteps, activeStep: 2 },
};

const Walker = () => {
	const [step, setStep] = useState(0);
	return (
		<div style={{ width: 720, display: 'flex', flexDirection: 'column', gap: 24 }}>
			<AnimatedStepper steps={planSteps} activeStep={step} />
			<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
				<Button variant='outline' size='sm' disabled={step === 0} onClick={() => setStep(step - 1)}>
					Back
				</Button>
				<Button size='sm' disabled={step === planSteps.length - 1} onClick={() => setStep(step + 1)}>
					Next
				</Button>
				<Button variant='ghost' size='sm' onClick={() => setStep(0)}>
					Reset
				</Button>
			</div>
		</div>
	);
};

export const Interactive: Story = {
	render: () => <Walker />,
};
