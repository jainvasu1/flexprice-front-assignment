import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FC } from 'react';

/**
 * Polished pill toggle with spring physics (framer-motion).
 * Uses the existing Flexprice palette only — navy `#092E44` ON, zinc `#D4D4D8` OFF.
 * The knob settles with a soft overshoot, like iOS / modern dashboard switches.
 */
interface PolishedToggleProps {
	checked: boolean;
	onChange: (next: boolean) => void;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	description?: string;
	className?: string;
}

const SIZES = {
	sm: { trackW: 36, trackH: 20, knob: 16, padding: 2 },
	md: { trackW: 48, trackH: 26, knob: 22, padding: 2 },
	lg: { trackW: 60, trackH: 32, knob: 28, padding: 2 },
} as const;

const PolishedToggle: FC<PolishedToggleProps> = ({ checked, onChange, disabled = false, size = 'md', label, description, className }) => {
	const dim = SIZES[size];
	const knobX = checked ? dim.trackW - dim.knob - dim.padding : dim.padding;
	const knobTop = (dim.trackH - dim.knob) / 2;

	const switchEl = (
		<motion.button
			type='button'
			role='switch'
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onChange(!checked)}
			whileTap={{ scale: 0.94 }}
			animate={{ backgroundColor: checked ? '#092E44' : '#D4D4D8' }}
			transition={{ duration: 0.25, ease: 'easeOut' }}
			style={{
				width: dim.trackW,
				height: dim.trackH,
				padding: 0,
				border: 'none',
				position: 'relative',
				flexShrink: 0,
			}}
			className={cn(
				'rounded-full',
				'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#092E44]',
				disabled && 'opacity-50 cursor-not-allowed',
				!disabled && 'cursor-pointer',
			)}>
			<motion.span
				animate={{ x: knobX }}
				transition={{ type: 'spring', stiffness: 700, damping: 32 }}
				style={{
					position: 'absolute',
					top: knobTop,
					left: 0,
					width: dim.knob,
					height: dim.knob,
					borderRadius: '9999px',
					backgroundColor: '#FFFFFF',
					boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)',
				}}
			/>
		</motion.button>
	);

	if (!label && !description) {
		return <div className={className}>{switchEl}</div>;
	}

	return (
		<div className={cn('flex items-start gap-3', className)}>
			{switchEl}
			<div className='flex flex-col leading-tight'>
				{label && <span className={cn('text-sm font-medium', disabled ? 'text-zinc-500' : 'text-[#18181B]')}>{label}</span>}
				{description && <span className='text-sm text-[#71717A] mt-1'>{description}</span>}
			</div>
		</div>
	);
};

export default PolishedToggle;
