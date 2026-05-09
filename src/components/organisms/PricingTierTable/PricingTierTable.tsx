import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FC, ReactNode } from 'react';
import { formatCurrency } from '@/lib/formatCurrency';
import { calculateTierPrice, PricingTier, TierMode } from '@/lib/tierPrice';

/**
 * Reads tiered pricing in a clean table layout.
 * Supports `graduated` and `volume` modes (see `lib/tierPrice.ts`),
 * and surfaces a live-calculated total for a sample usage value.
 */
interface PricingTierTableProps {
	tiers: PricingTier[];
	mode?: TierMode;
	currency?: string;
	/** Optional usage value to display the live total */
	sampleUsage?: number;
	/** Header title for the card */
	title?: string;
	subtitle?: string;
	/** Right-aligned slot in the header (e.g. mode toggle) */
	headerRight?: ReactNode;
	className?: string;
}

const formatRange = (from: number, to: number | null): string => {
	if (to === null) return `${from.toLocaleString()}+`;
	return `${from.toLocaleString()} – ${to.toLocaleString()}`;
};

const PricingTierTable: FC<PricingTierTableProps> = ({
	tiers,
	mode = 'graduated',
	currency = 'USD',
	sampleUsage,
	title = 'Pricing tiers',
	subtitle,
	headerRight,
	className,
}) => {
	const sorted = [...tiers].sort((a, b) => a.from - b.from);
	const total = sampleUsage !== undefined ? calculateTierPrice(sampleUsage, sorted, mode) : undefined;

	return (
		<div className={cn('rounded-xl border border-[#E4E4E7] bg-white overflow-hidden', className)}>
			<div className='flex items-center justify-between px-5 py-4 border-b border-[#E4E4E7]'>
				<div>
					<div className='flex items-center gap-2'>
						<h3 className='text-base font-semibold text-[#092E44]'>{title}</h3>
						<span
							className={cn(
								'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider',
								mode === 'graduated' ? 'bg-[#EFF6FF] text-[#1E40AF]' : 'bg-[#F0FDF4] text-[#065F46]',
							)}>
							{mode === 'graduated' ? 'Graduated' : 'Volume'}
						</span>
					</div>
					{subtitle && <p className='text-xs text-[#71717A] mt-0.5'>{subtitle}</p>}
				</div>
				{headerRight}
			</div>

			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-[#FAFAFA] border-b border-[#E4E4E7]'>
						<th className='text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#71717A]'>Tier</th>
						<th className='text-left px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#71717A]'>Range (units)</th>
						<th className='text-right px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#71717A]'>Per unit</th>
						<th className='text-right px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#71717A]'>Flat fee</th>
					</tr>
				</thead>
				<tbody>
					{sorted.map((tier, i) => (
						<tr key={i} className='border-b border-[#F4F4F5] last:border-b-0'>
							<td className='px-5 py-3'>
								<div className='inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#092E44]/5 text-[#092E44] text-xs font-semibold'>
									{i + 1}
								</div>
							</td>
							<td className='px-5 py-3 text-sm text-[#18181B]'>{formatRange(tier.from, tier.to)}</td>
							<td className='px-5 py-3 text-sm text-right font-mono'>{formatCurrency(tier.unitPrice, currency)}</td>
							<td className='px-5 py-3 text-sm text-right font-mono text-[#71717A]'>
								{tier.flatFee ? formatCurrency(tier.flatFee, currency) : '—'}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{sampleUsage !== undefined && total !== undefined && (
				<div className='flex items-center justify-between px-5 py-4 bg-[#FAFAFA] border-t border-[#E4E4E7]'>
					<div className='text-xs text-[#71717A]'>
						Estimated cost for{' '}
						<span className='font-semibold text-[#18181B] tabular-nums'>{sampleUsage.toLocaleString()}</span> units{' '}
						<span className='text-[#A1A1AA]'>· {mode === 'graduated' ? 'each tier counted' : 'highest tier rate'}</span>
					</div>
					<div className='inline-flex items-center gap-2 text-sm font-semibold text-[#092E44]'>
						<Check size={14} className='text-[#10B981]' />
						<span className='tabular-nums'>{formatCurrency(total, currency)}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default PricingTierTable;
