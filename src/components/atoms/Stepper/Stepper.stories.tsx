import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

/**
 * Horizontal stepper used in multi-step flows like plan creation or onboarding.
 * Indicates completed, active and pending steps.
 */
const meta = {
	title: 'Atoms/Stepper',
	component: Stepper,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		activeStep: { control: { type: 'number', min: 0 } },
	},
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const planSteps = [{ label: 'Basic info' }, { label: 'Pricing' }, { label: 'Entitlements' }, { label: 'Review' }];

export const Default: Story = {
	args: {
		steps: planSteps,
		activeStep: 0,
	},
};

export const InProgress: Story = {
	args: {
		steps: planSteps,
		activeStep: 2,
	},
};

export const NearComplete: Story = {
	args: {
		steps: planSteps,
		activeStep: 3,
	},
};

export const TwoSteps: Story = {
	args: {
		steps: [{ label: 'Login' }, { label: 'Verify' }],
		activeStep: 1,
	},
};
