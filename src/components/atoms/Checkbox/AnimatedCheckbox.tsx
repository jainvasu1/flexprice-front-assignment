import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FC } from 'react';

/**
 * Checkbox with a spring-in checkmark and animated background.
 * Same Flexprice palette — `#092E44` on, white off.
 */
interface AnimatedCheckboxProps {
	id?: string;
	checked: boolean;
	onChange: (next: boolean) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
	className?: string;
}

const AnimatedCheckbox: FC<AnimatedCheckboxProps> = ({ id, checked, onChange, label, description, disabled = false, className }) => {
	return (
		<div className={cn('flex items-start gap-2.5', className)}>
			<motion.button
				type='button'
				role='checkbox'
				aria-checked={checked}
				id={id}
				disabled={disabled}
				onClick={() => onChange(!checked)}
				whileTap={{ scale: 0.88 }}
				animate={{
					backgroundColor: checked ? '#092E44' : '#FFFFFF',
					borderColor: checked ? '#092E44' : '#D4D4D8',
				}}
				transition={{ duration: 0.15 }}
				className={cn(
					'relative flex items-center justify-center h-[18px] w-[18px] rounded border-2 mt-[1px]',
					'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#092E44]',
					disabled && 'opacity-50 cursor-not-allowed',
					!disabled && 'cursor-pointer',
				)}>
				<AnimatePresence>
					{checked && (
						<motion.svg
							key='check'
							viewBox='0 0 24 24'
							fill='none'
							stroke='white'
							strokeWidth={3.5}
							strokeLinecap='round'
							strokeLinejoin='round'
							style={{ width: 12, height: 12 }}
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							exit={{ pathLength: 0, opacity: 0 }}
							transition={{ duration: 0.25, ease: 'easeOut' }}>
							<motion.polyline points='20 6 9 17 4 12' />
						</motion.svg>
					)}
				</AnimatePresence>
			</motion.button>
			{(label || description) && (
				<label htmlFor={id} className='leading-tight cursor-pointer select-none'>
					{label && <span className={cn('block text-sm font-medium', disabled ? 'text-zinc-500' : 'text-[#18181B]')}>{label}</span>}
					{description && <span className='block text-xs text-[#71717A] mt-0.5'>{description}</span>}
				</label>
			)}
		</div>
	);
};

export default AnimatedCheckbox;
