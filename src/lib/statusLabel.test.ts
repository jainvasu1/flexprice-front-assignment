import { describe, it, expect } from 'vitest';
import {
	invoiceStatusLabel,
	invoiceStatusTone,
	subscriptionStatusLabel,
	subscriptionStatusTone,
	planStatusLabel,
	planStatusTone,
} from './statusLabel';

describe('invoiceStatusLabel', () => {
	it('maps known statuses to display labels', () => {
		expect(invoiceStatusLabel('paid')).toBe('Paid');
		expect(invoiceStatusLabel('pending')).toBe('Pending');
		expect(invoiceStatusLabel('processing')).toBe('Processing');
		expect(invoiceStatusLabel('failed')).toBe('Failed');
		expect(invoiceStatusLabel('draft')).toBe('Draft');
		expect(invoiceStatusLabel('refunded')).toBe('Refunded');
		expect(invoiceStatusLabel('void')).toBe('Void');
	});
});

describe('invoiceStatusTone', () => {
	it('paid is success', () => {
		expect(invoiceStatusTone('paid')).toBe('success');
	});

	it('failed is danger', () => {
		expect(invoiceStatusTone('failed')).toBe('danger');
	});

	it('pending is warning', () => {
		expect(invoiceStatusTone('pending')).toBe('warning');
	});

	it('draft is neutral', () => {
		expect(invoiceStatusTone('draft')).toBe('neutral');
	});
});

describe('subscriptionStatusLabel', () => {
	it('formats past_due with a space', () => {
		expect(subscriptionStatusLabel('past_due')).toBe('Past due');
	});

	it('shortens trialing to Trial', () => {
		expect(subscriptionStatusLabel('trialing')).toBe('Trial');
	});

	it('active is success tone', () => {
		expect(subscriptionStatusTone('active')).toBe('success');
	});
});

describe('planStatusLabel', () => {
	it('handles all plan statuses', () => {
		expect(planStatusLabel('active')).toBe('Active');
		expect(planStatusLabel('archived')).toBe('Archived');
		expect(planStatusLabel('draft')).toBe('Draft');
	});

	it('archived is neutral, draft is warning', () => {
		expect(planStatusTone('archived')).toBe('neutral');
		expect(planStatusTone('draft')).toBe('warning');
	});
});
