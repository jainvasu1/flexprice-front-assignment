import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusBadge from './StatusBadge';

describe('<StatusBadge />', () => {
	it('renders the default label for each known status', () => {
		const { rerender } = render(<StatusBadge status='paid' />);
		expect(screen.getByText('Paid')).toBeInTheDocument();

		rerender(<StatusBadge status='failed' />);
		expect(screen.getByText('Failed')).toBeInTheDocument();

		rerender(<StatusBadge status='pending' />);
		expect(screen.getByText('Pending')).toBeInTheDocument();
	});

	it('uses the custom label when provided', () => {
		render(<StatusBadge status='pending' label='Awaiting payment' />);
		expect(screen.getByText('Awaiting payment')).toBeInTheDocument();
		expect(screen.queryByText('Pending')).not.toBeInTheDocument();
	});

	it('applies the success color tokens for paid', () => {
		render(<StatusBadge status='paid' />);
		const badge = screen.getByText('Paid').parentElement!;
		// inline style check — `bg` for paid is #ECFDF5 (success-50)
		expect(badge.style.backgroundColor).toMatch(/(rgb\(236, 253, 245\))|#ECFDF5/i);
	});

	it('renders the supplemental dot element for pulse statuses', () => {
		const { container } = render(<StatusBadge status='processing' />);
		// The dot wrapper has h-2 w-2 — find a span with those classes
		const dot = container.querySelector('span.h-2.w-2');
		expect(dot).toBeTruthy();
	});
});
