import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('<Button />', () => {
	it('renders its children as the visible label', () => {
		render(<Button>Save changes</Button>);
		expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click me</Button>);
		fireEvent.click(screen.getByRole('button', { name: /click me/i }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('does not fire onClick while loading', () => {
		const onClick = vi.fn();
		render(
			<Button onClick={onClick} isLoading>
				Saving
			</Button>,
		);
		fireEvent.click(screen.getByRole('button'));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('does not fire onClick when disabled', () => {
		const onClick = vi.fn();
		render(
			<Button onClick={onClick} disabled>
				Off
			</Button>,
		);
		fireEvent.click(screen.getByRole('button', { name: /off/i }));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('renders with the destructive variant class', () => {
		render(<Button variant='destructive'>Delete</Button>);
		const btn = screen.getByRole('button', { name: /delete/i });
		expect(btn.className).toMatch(/destructive/);
	});
});
