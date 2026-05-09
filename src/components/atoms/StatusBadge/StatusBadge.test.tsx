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
		const { container } = render(<StatusBadge status='paid' />);
		// The outermost <span> carries the inline-style backgroundColor.
		const badge = container.firstElementChild as HTMLElement;
		expect(badge).toBeTruthy();
		const styleAttr = badge.getAttribute('style') ?? '';
		// Token bg for `paid` is #ECFDF5. JSDOM may keep the hex or normalize
		// it to `rgb(236, 253, 245)` depending on version.
		expect(styleAttr.toLowerCase()).toMatch(/#ecfdf5|rgb\(236,\s*253,\s*245\)/);
	});

	it('renders the supplemental dot element for pulse statuses', () => {
		const { container } = render(<StatusBadge status='processing' />);
		// The dot wrapper has h-2 w-2 — find a span with those classes
		const dot = container.querySelector('span.h-2.w-2');
		expect(dot).toBeTruthy();
	});
});
