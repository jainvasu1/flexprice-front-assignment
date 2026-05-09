import { cn } from '@/lib/utils';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Metric counter that animates from 0 → target on mount or value change.
 * Supports currency / percentage / plain number formatting and a delta indicator.
 * Same Flexprice palette only.
 */
interface AnimatedCounterProps {
	value: number;
	label?: string;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	delta?: number;
	deltaLabel?: string;
	durationMs?: number;
	className?: string;
}

const fmt = (v: number, decimals: number) =>
	v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const AnimatedCounter: FC<AnimatedCounterProps> = ({
	value,
	label,
	prefix = '',
	suffix = '',
	decimals = 0,
	delta,
	deltaLabel,
	durationMs = 1400,
	className,
}) => {
	const count = useMotionValue(0);
	const formatted = useTransform(count, (v) => `${prefix}${fmt(v, decimals)}${suffix}`);
	const [text, setText] = useState(`${prefix}${fmt(0, decimals)}${suffix}`);

	useEffect(() => {
		const controls = animate(count, value, {
			duration: durationMs / 1000,
			ease: [0.25, 0.46, 0.45, 0.94],
		});
		const unsubscribe = formatted.on('change', (v) => setText(v));
		return () => {
			controls.stop();
			unsubscribe();
		};
	}, [value, count, formatted, durationMs]);

	const deltaTone =
		delta === undefined || delta === 0
			? { color: '#71717A', bg: '#F4F4F5', Icon: Minus }
			: delta > 0
				? { color: '#065F46', bg: '#ECFDF5', Icon: TrendingUp }
				: { color: '#991B1B', bg: '#FEF2F2', Icon: TrendingDown };

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			className={cn('flex flex-col gap-1', className)}>
			{label && <span className='text-xs font-medium uppercase tracking-wider text-[#71717A]'>{label}</span>}
			<span className='text-3xl font-semibold tabular-nums text-[#092E44]'>{text}</span>
			{delta !== undefined && (
				<div
					className='inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium self-start mt-1'
					style={{ backgroundColor: deltaTone.bg, color: deltaTone.color }}>
					<deltaTone.Icon size={12} strokeWidth={2.5} />
					<span className='tabular-nums'>
						{delta > 0 ? '+' : ''}
						{delta}%
					</span>
					{deltaLabel && <span className='opacity-75 ml-0.5'>{deltaLabel}</span>}
				</div>
			)}
		</motion.div>
	);
};

export default AnimatedCounter;
