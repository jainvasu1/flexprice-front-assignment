import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { FC, Fragment } from 'react';

/**
 * Stepper with animated connector fills, pulsing active circle and
 * spring-in checkmarks. Same Flexprice palette — `#092E44` for primary state.
 */
interface Step {
	label: string;
	hint?: string;
}

interface AnimatedStepperProps {
	steps: Step[];
	activeStep: number;
	className?: string;
}

const AnimatedStepper: FC<AnimatedStepperProps> = ({ steps, activeStep, className }) => {
	return (
		<div className={cn('flex items-start w-full', className)}>
			{steps.map((step, i) => {
				const isActive = i === activeStep;
				const isCompleted = i < activeStep;
				const isLast = i === steps.length - 1;

				return (
					<Fragment key={i}>
						<div className='flex flex-col items-center' style={{ flex: '0 0 auto', minWidth: 96 }}>
							<motion.div
								initial={false}
								animate={{
									backgroundColor: isCompleted ? '#092E44' : isActive ? '#FFFFFF' : '#FAFAFA',
									borderColor: isCompleted ? '#092E44' : isActive ? '#092E44' : '#E4E4E7',
									scale: isActive ? 1.06 : 1,
								}}
								transition={{ type: 'spring', stiffness: 400, damping: 24 }}
								className='relative flex items-center justify-center h-8 w-8 rounded-full border-2'>
								{isActive && (
									<motion.span
										className='absolute inset-0 rounded-full'
										style={{ border: '2px solid #092E44' }}
										animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
										transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
									/>
								)}
								{isCompleted ? (
									<motion.span
										key='check'
										initial={{ scale: 0, rotate: -45 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
										<Check size={16} color='white' strokeWidth={3} />
									</motion.span>
								) : (
									<span className={cn('text-xs font-semibold', isActive ? 'text-[#092E44]' : 'text-[#A1A1AA]')}>{i + 1}</span>
								)}
							</motion.div>

							<div className='mt-2 text-center'>
								<div className={cn('text-xs font-semibold', isCompleted || isActive ? 'text-[#092E44]' : 'text-[#A1A1AA]')}>
									{step.label}
								</div>
								{step.hint && <div className='text-[10px] text-[#A1A1AA] mt-0.5'>{step.hint}</div>}
							</div>
						</div>

						{!isLast && (
							<div className='relative flex-1 h-0.5 mt-4 mx-1 rounded-full' style={{ backgroundColor: '#E4E4E7' }}>
								<motion.div
									className='absolute inset-0 rounded-full'
									initial={false}
									animate={{ scaleX: isCompleted ? 1 : 0 }}
									style={{ backgroundColor: '#092E44', originX: 0 }}
									transition={{ duration: 0.5, ease: 'easeOut' }}
								/>
							</div>
						)}
					</Fragment>
				);
			})}
		</div>
	);
};

export default AnimatedStepper;
