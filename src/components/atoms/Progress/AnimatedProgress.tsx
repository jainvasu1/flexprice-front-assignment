import { cn } from '@/lib/utils';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FC, useEffect, useState } from 'react';

/**
 * Progress bar with a count-up label and spring-eased fill.
 * Reuses the Flexprice palette — primary navy `#092E44` by default.
 */
interface AnimatedProgressProps {
	value: number;
	label?: string;
	tone?: 'primary' | 'success' | 'warning' | 'danger';
	showPercent?: boolean;
	durationMs?: number;
	className?: string;
}

const TONES = {
	primary: { bar: '#092E44', text: '#092E44', track: '#E4E4E7' },
	success: { bar: '#10B981', text: '#065F46', track: '#D1FAE5' },
	warning: { bar: '#F59E0B', text: '#92400E', track: '#FEF3C7' },
	danger: { bar: '#EF4444', text: '#991B1B', track: '#FEE2E2' },
} as const;

const AnimatedProgress: FC<AnimatedProgressProps> = ({
	value,
	label,
	tone = 'primary',
	showPercent = true,
	durationMs = 1200,
	className,
}) => {
	const palette = TONES[tone];
	const count = useMotionValue(0);
	const rounded = useTransform(count, (v) => Math.round(v));
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		const controls = animate(count, value, {
			duration: durationMs / 1000,
			ease: [0.25, 0.46, 0.45, 0.94],
		});
		const unsubscribe = rounded.on('change', (v) => setDisplay(v));
		return () => {
			controls.stop();
			unsubscribe();
		};
	}, [value, count, rounded, durationMs]);

	return (
		<div className={cn('w-full', className)}>
			{(label || showPercent) && (
				<div className='flex items-center justify-between mb-1.5'>
					{label && (
						<span className='text-xs font-medium' style={{ color: palette.text }}>
							{label}
						</span>
					)}
					{showPercent && (
						<span className='text-xs font-semibold tabular-nums' style={{ color: palette.text }}>
							{display}%
						</span>
					)}
				</div>
			)}
			<div className='relative h-2 w-full overflow-hidden rounded-full' style={{ backgroundColor: palette.track }}>
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${value}%` }}
					transition={{ duration: durationMs / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
					className='h-full rounded-full'
					style={{ backgroundColor: palette.bar }}
				/>
			</div>
		</div>
	);
};

export default AnimatedProgress;
