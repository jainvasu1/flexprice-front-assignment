import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FC } from 'react';

/**
 * Invoice / subscription status badge with a colored dot.
 * `pending` and `processing` show a soft pulse animation, like Stripe.
 * Reuses Flexprice palette tokens — zinc, green, amber, red, sky.
 */
export type StatusKind = 'paid' | 'pending' | 'processing' | 'failed' | 'draft' | 'refunded';

interface StatusBadgeProps {
	status: StatusKind;
	label?: string;
	className?: string;
}

const STATUS_TOKENS: Record<StatusKind, { label: string; dot: string; text: string; bg: string; border: string; pulse?: boolean }> = {
	paid: { label: 'Paid', dot: '#10B981', text: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' },
	pending: { label: 'Pending', dot: '#F59E0B', text: '#92400E', bg: '#FFFBEB', border: '#FCD34D', pulse: true },
	processing: { label: 'Processing', dot: '#3B82F6', text: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE', pulse: true },
	failed: { label: 'Failed', dot: '#EF4444', text: '#991B1B', bg: '#FEF2F2', border: '#FECACA' },
	draft: { label: 'Draft', dot: '#71717A', text: '#3F3F46', bg: '#FAFAFA', border: '#E4E4E7' },
	refunded: { label: 'Refunded', dot: '#6366F1', text: '#3730A3', bg: '#EEF2FF', border: '#C7D2FE' },
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, label, className }) => {
	const token = STATUS_TOKENS[status];

	return (
		<span
			className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', className)}
			style={{
				backgroundColor: token.bg,
				borderColor: token.border,
				color: token.text,
			}}>
			<span className='relative flex h-2 w-2'>
				{token.pulse && (
					<motion.span
						className='absolute inline-flex h-full w-full rounded-full'
						style={{ backgroundColor: token.dot }}
						animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
						transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
					/>
				)}
				<span className='relative inline-flex rounded-full h-2 w-2' style={{ backgroundColor: token.dot }} />
			</span>
			{label ?? token.label}
		</span>
	);
};

export default StatusBadge;
