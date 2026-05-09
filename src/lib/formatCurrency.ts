/**
 * Format a numeric amount as a localized currency string.
 *
 * Examples:
 *   formatCurrency(1234.5)            -> "$1,234.50"
 *   formatCurrency(99, 'EUR', 'de-DE') -> "99,00 €"
 *   formatCurrency(0.5, 'INR')         -> "₹0.50"
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
	if (!Number.isFinite(amount)) return '—';
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	}).format(amount);
}

/**
 * Compact currency for KPI cards: $1.2K, $1.4M, etc.
 */
export function formatCurrencyCompact(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
	if (!Number.isFinite(amount)) return '—';
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(amount);
}
