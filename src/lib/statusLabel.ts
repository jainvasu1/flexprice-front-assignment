/**
 * Maps backend status strings to human-readable labels and tones.
 * Centralised so badges / chips / row indicators all agree.
 */

export type InvoiceStatus = 'paid' | 'pending' | 'processing' | 'failed' | 'draft' | 'refunded' | 'void';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'paused';
export type PlanStatus = 'active' | 'archived' | 'draft';

export type Tone = 'success' | 'warning' | 'info' | 'danger' | 'neutral';

interface StatusMeta {
	label: string;
	tone: Tone;
}

const INVOICE: Record<InvoiceStatus, StatusMeta> = {
	paid: { label: 'Paid', tone: 'success' },
	pending: { label: 'Pending', tone: 'warning' },
	processing: { label: 'Processing', tone: 'info' },
	failed: { label: 'Failed', tone: 'danger' },
	draft: { label: 'Draft', tone: 'neutral' },
	refunded: { label: 'Refunded', tone: 'info' },
	void: { label: 'Void', tone: 'neutral' },
};

const SUBSCRIPTION: Record<SubscriptionStatus, StatusMeta> = {
	active: { label: 'Active', tone: 'success' },
	trialing: { label: 'Trial', tone: 'info' },
	past_due: { label: 'Past due', tone: 'warning' },
	canceled: { label: 'Canceled', tone: 'neutral' },
	paused: { label: 'Paused', tone: 'neutral' },
};

const PLAN: Record<PlanStatus, StatusMeta> = {
	active: { label: 'Active', tone: 'success' },
	archived: { label: 'Archived', tone: 'neutral' },
	draft: { label: 'Draft', tone: 'warning' },
};

export function invoiceStatusLabel(s: InvoiceStatus): string {
	return INVOICE[s].label;
}

export function invoiceStatusTone(s: InvoiceStatus): Tone {
	return INVOICE[s].tone;
}

export function subscriptionStatusLabel(s: SubscriptionStatus): string {
	return SUBSCRIPTION[s].label;
}

export function subscriptionStatusTone(s: SubscriptionStatus): Tone {
	return SUBSCRIPTION[s].tone;
}

export function planStatusLabel(s: PlanStatus): string {
	return PLAN[s].label;
}

export function planStatusTone(s: PlanStatus): Tone {
	return PLAN[s].tone;
}
