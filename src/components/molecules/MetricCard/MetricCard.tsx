import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import Card from '@/components/atoms/Card/Card';
import AnimatedCounter from '@/components/atoms/AnimatedCounter/AnimatedCounter';

/**
 * Dashboard KPI card. Composes Card + AnimatedCounter into a single unit
 * with an optional icon slot and trend indicator.
 *
 * Used on the Flexprice overview dashboard for metrics like
 * Revenue, Active Subscriptions, Avg Invoice, Uptime, etc.
 */
interface MetricCardProps {
	label: string;
	value: number;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	delta?: number;
	deltaLabel?: string;
	icon?: ReactNode;
	footer?: ReactNode;
	loading?: boolean;
	className?: string;
}

const MetricCard: FC<MetricCardProps> = ({
	label,
	value,
	prefix,
	suffix,
	decimals,
	delta,
	deltaLabel,
	icon,
	footer,
	loading = false,
	className,
}) => {
	if (loading) {
		return (
			<Card className={className}>
				<div className='flex flex-col gap-3'>
					<div className='h-3 w-20 rounded bg-zinc-200 animate-pulse' />
					<div className='h-8 w-32 rounded bg-zinc-200 animate-pulse' />
					<div className='h-4 w-24 rounded bg-zinc-200 animate-pulse' />
				</div>
			</Card>
		);
	}

	return (
		<Card className={cn('relative overflow-hidden', className)}>
			{icon && (
				<div className='absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-lg bg-[#092E44]/5 text-[#092E44]'>
					{icon}
				</div>
			)}
			<AnimatedCounter
				label={label}
				value={value}
				prefix={prefix}
				suffix={suffix}
				decimals={decimals}
				delta={delta}
				deltaLabel={deltaLabel}
			/>
			{footer && <div className='mt-3 pt-3 border-t border-zinc-100 text-xs text-zinc-500'>{footer}</div>}
		</Card>
	);
};

export default MetricCard;
